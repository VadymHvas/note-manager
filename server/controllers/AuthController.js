import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv/config.js";

export const registerUser = async (req, res) => {
    const { username, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const isUsed = await UserModel.findOne({username});

    if (isUsed) {
        return res.json({
            message: "Таке ім'я вже зайняте!",
        });
    };

    const doc = new UserModel({username, password: passwordHash});

    const token = jwt.sign({
        id: doc._id,
    }, process.env.JWT_SECRET, {expiresIn: "300d"});

    await doc.save();

    return res.json({
        doc,
        token,
    });
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    const user = await UserModel.findOne({username});

    if (!user) {
        return res.json({
            message: "Неправильний логін або пароль",
        });
    };

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
        return res.json({
            message: "Неправильний логін або пароль"
        });
    };

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, {expiresIn: "30d"});

    return res.json({
        user, 
        token,
    });
};

export const getMe = async (req, res) => {
    const user = await UserModel.findById(req.userId);

    if (!user) {
        return res.json({
            message: "Такого користувача не існує",
        });
    };

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, {expiresIn: "300d"});

    return res.json({
        user,
        token,
    });
};
