import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios.js";

const initialState = {
    myNotes: [],
    fullNote: {},
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

export const getFullNote = createAsyncThunk("note/fullNote", async ({id}) => {
    const { data } = await axios.post(`/note/fullNote`, {id});

    return data;
});

export const deleteNote = createAsyncThunk("note/delete", async ({id}) => {
    const { data } = await axios.post("/note/deleteNote", { id });

    return data;
});

export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        resetFullNoteState: (state, action) => {
            state.fullNote = action.type;
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
            state.message = action.payload.message;
        },

        // Get full note

        [getFullNote.pending]: state => {
            state.loading = true;
        },
        [getFullNote.fulfilled]: (state, action) => {
            state.loading = false;
            state.fullNote = action.payload.fullNote;
            state.message = action.payload.message;
        },

        // Delete note

        [deleteNote.pending]: state => {
            state.loading = true;
        },
        [deleteNote.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
    },
});

export default noteSlice.reducer;
export const { resetFullNoteState } = noteSlice.actions;