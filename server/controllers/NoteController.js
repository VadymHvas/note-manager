import NoteModel from "../models/NoteModel.js";
import UserModel from "../models/UserModel.js";
import { getDate } from "../utils/getDate.js";

export const createNote = async (req, res) => {
    const { title, body } = req.body;
    const user = await UserModel.findById(req.userId);

    if (!user) {
        return res.json({
            message: "Користувача не існує!",
        });
    };

    const newNote = new NoteModel(
        {
            title, body, author: user._id, username: user.username,
            userAvatar: user.avatar, normalDate: getDate(),
        },
    );

    await UserModel.findByIdAndUpdate(req.userId, {
        $push: { notes: newNote },
    });
    
    await newNote.save();
};

export const getMyNotes = async (req, res) => {
    const user = await UserModel.findById(req.userId);

    if (!user) {
        return res.json({
            message: "Користувача не існує!",
        });
    };

    const myNotes = await Promise.all(
        user.notes.map(note => {
            return NoteModel.findById(note);
        }),
    );

    return res.json({myNotes});
};