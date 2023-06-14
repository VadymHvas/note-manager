import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios.js";

const initialState = {
    myNotes: [],
    loading: false,
    message: null,
};

export const createNote = createAsyncThunk("note/createNote", async (params) => {
    const { data } = await axios.post("/note/create", params);

    return data;
}); 

export const getMyNotes = createAsyncThunk("note/getMyNotes", async () => {
    const { data } = await axios.get("/note/getMyNotes");

    return data;
});

export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        rand: () => {
            console.log(Math.random());
        },
    },
    extraReducers: {
        // Create note

        [createNote.pending]: state => {
            state.loading = true;
        },
        [createNote.fulfilled]: (state, action) => {
            state.message = action.payload.message;
            state.loading = false;
        },

        // Get my notes

        [getMyNotes.pending]: state => {
            state.loading = true;
        },
        [getMyNotes.fulfilled]: (state, action) => {
            state.loading = false;
            state.myNotes = action.payload.myNotes;
        },
    },
});

export default noteSlice.reducer;