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

    todos: {
        type: mongoose.Types.ObjectId,
        ref: "Todos",
    },
}, {
    timestamps: true,
});

export default mongoose.model("User", UserSchema);