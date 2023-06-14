import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    body: {
        type: String,
        required: true,
    },

    isComplete: {
        type: String,
        default: false,
    },
 
    author: {
        type: String,
        required: true,
    },

    username: {
        type: String,
        required: true,
    },

    userAvatar: {   
        type: String,
        required: true,
    },

    normalDate: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Note", NoteSchema);