import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        default: "defaultAvatar.jpeg",
    },

    notes: [{
        type: mongoose.Types.ObjectId,
        ref: "Note",
    }],
}, {
    timestamps: true,
});

export default mongoose.model("User", UserSchema);