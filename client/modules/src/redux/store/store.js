import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../features/AuthSlice";
import NoteSlice from "../features/NoteSlice";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        note: NoteSlice,
    },
});