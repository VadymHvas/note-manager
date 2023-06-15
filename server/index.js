import express from "express";
import mongoose from "mongoose";
import {
  registerUser,
  loginUser,
  getMe,
  updateAccount,
} from "./controllers/AuthController.js";
import {
  registerValidation,
  updateValidation,
} from "./validations/AuthValidation.js";
import { checkAuth } from "./middlewares/CheckAuth.js";
import dotenv from "dotenv/config";
import cors from "cors";
import fileUpload from "express-fileupload";
import {
  createNote,
  deleteNote,
  getFullNote,
  getMyNotes,
} from "./controllers/NoteController.js";
import { createNoteValidation } from "./validations/NoteValidation.js";

const DB_URL = process.env.DB_URL;

mongoose
  .connect(DB_URL)
  .then(() => console.log("DATABASE OK"))
  .catch(() => console.log("DATABASE ERROR"));

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(express.static("uploads"));

// Auth routes

app.post("/auth/register", registerValidation, registerUser);
app.post("/auth/login", loginUser);
app.get("/getMe", checkAuth, getMe);
app.post("/updateAccount", checkAuth, updateValidation, updateAccount);

// Note routes

app.post("/note/create", checkAuth, createNoteValidation, createNote);
app.get("/note/getMyNotes", checkAuth, getMyNotes);
app.post("/note/fullNote", getFullNote);
app.post("/note/deleteNote", checkAuth, deleteNote);

app.listen(4444, () => {
  console.log("SERVER OK");
});
