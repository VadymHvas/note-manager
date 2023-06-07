import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

const initialState =  {
    user: {},
    loading: false,
    message: null,
    token: null, 
};

export const register = createAsyncThunk("auth/register", async ({username, password}) => {
    const res = await axios.post("/auth/register", {username, password});

    return res;
});

export const login = createAsyncThunk("auth/login", async ({username, password}) => {
    const res = await axios.post("/auth/login", {username, password});

    return res;
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = {};
            state.token = null;
        },
    },
    extraReducers: {
        // register

        [register.pending]: () => console.log("loading"),

        [register.fulfilled]: (state, action) => {
            state.user = action.payload.data.doc;
            state.message = action.payload.data.message;
            state.token = action.payload.data.token;
        },

        [register.rejected]: () => console.log("sokkk"),
    },
});

export const checkAuth = (state) => Boolean(state.auth.token);
export const { logout } = authSlice.actions;
export default authSlice.reducer;