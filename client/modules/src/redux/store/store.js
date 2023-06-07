import { configureStore } from "@reduxjs/toolkit";
import authSlice  from "../features/AuthSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice
    },
});