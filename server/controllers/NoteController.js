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
            title, body, author: user._id, normalDate: getDate(),
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

    if (myNotes.length === 0) {
        return res.json({message: "Нотаток немає"});
    };

    return res.json({myNotes});
};

export const getFullNote = async (req, res) => {
    const { id } = req.body;

    const fullNote = await NoteModel.findById(id);

    if (!fullNote) {
        return res.json({
            message: "Нотатки не існує!",
        });
    };

    return res.json({fullNote});
};

export const deleteNote = async (req, res) => {
    const { id } = req.body;

    const note = await NoteModel.findById(id);
    const author = await UserModel.findById(note.author);

    if (!note) {
        return res.json({
            message: "Нотатки не існує",
        });
    };

    if (!author) {
        return res.json({
            message: "Користувача не існує",
        });
    };

    await UserModel.findByIdAndUpdate(note.author, {
        $pull: { notes: { $in: [note] } },
    });

    await NoteModel.findByIdAndDelete(id);
};

export const addToFavorite = async (req, res) => {
    const { id } = req.body;

    const note = await NoteModel.findById(id);

    if (!note) {
        return res.json({
            message: "Нотатки не існує",
        });
    };

    await NoteModel.findByIdAndUpdate(id, {
        isFavorite: true,
    });
};

export const removeFromFavorite = async (req, res) => {
    const { id } = req.body;

    const note = await NoteModel.findById(id);

    if (!note) {
        return res.json({
            message: "Нотатки не існує",
        });
    };

    await NoteModel.findByIdAndUpdate(id, {
        isFavorite: false,
    });
};

export const getFavorites = async (req, res) => {
    const user = await UserModel.findById(req.userId);

    if (!user) {
        return res.json({
            message: "Користувача не існує!",
        });
    };

    if (user.notes.length === 0) return false;
    
    const favoriteNotes = await Promise.all(
        user.notes.map(note => {
            return NoteModel.find({isFavorite: "true", _id: note._id});
        }),
    );

    return res.json({favoriteNotes});
};