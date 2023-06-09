import jwt from "jsonwebtoken";
import dotenv from "dotenv/config.js";

export const checkAuth = (req, res, next) => {
    const token = req.headers.authorization;  

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
        req.userId = decoded.id;
        next();
    } else {
        return res.json({
            message: "У вас нема доступу",
        });
    };
};

