import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios";

const initialState =  {
    user: {},
    loading: false,
    message: null,
    token: null, 
};

export const register = createAsyncThunk("auth/register", async (params) => {
    const { data } = await axios.post("/auth/register", params);

    if (data.token) {
        window.localStorage.setItem("token", data.token);
    };

    return data;
});

export const login = createAsyncThunk("auth/login", async (params) => {
    const { data } = await axios.post("/auth/login", params);

    if (data.token) {
        window.localStorage.setItem("token", data.token);
    };

    return data;
});

export const getMe = createAsyncThunk("auth/getMe", async () => {
    const { data } = await axios.get("/getMe");

    return data;
});

export const updateAccount = createAsyncThunk("auth/updateAccount", async (params) => {
    const { data } = await axios.post("/updateAccount", params);

    return data;
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

        [register.pending]: state => {
            state.loading = true;
        },
        [register.fulfilled]: (state, action) => {
            state.user = action.payload.doc;
            state.message = action.payload.message;
            state.token = action.payload.token;
            state.loading = false;
        },
        [register.rejected]: () => console.log("sokkk"),

        // Login

        [login.pending]: state => {
            state.loading = true;
        },
        [login.fulfilled]: (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.message = action.payload.message;
        },
        [login.rejected]: () => {},

        // Get me

        [getMe.pending]: () => {},
        [getMe.fulfilled]: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },

        // Update account 

        [updateAccount.pending]: state => {
            state.loading = true;
        },
        [updateAccount.fulfilled]: (state, action) => {
            state.user = action.payload.user;
        },
    },
});

export const checkAuth = (state) => Boolean(state.auth.token);
export const { logout } = authSlice.actions;
export default authSlice.reducer;