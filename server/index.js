import express from "express";
import mongoose from "mongoose";
import { registerUser, loginUser, getMe } from "./controllers/AuthController.js";
import { registerValidation } from "./validations/AuthValidation.js";
import { checkAuth } from "./middlewares/CheckAuth.js";
import cors from "cors";

const DB_URL = "mongodb+srv://novakoriss:Vadym7711@noteapp.6ddxkgl.mongodb.net/manager?retryWrites=true&w=majority";

mongoose.connect(DB_URL)
    .then(() => console.log("DATABASE OK"))
    .catch(() => console.log("DATABASE ERROR"));

const app = express();

app.use(express.json());
app.use(cors());

app.post("/auth/register", registerValidation, registerUser);
app.post("/auth/login", loginUser);
app.get("/getMe", checkAuth, getMe);

app.listen(4444, () => {
    console.log("SERVER OK");
});