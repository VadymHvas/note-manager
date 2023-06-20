import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/axios.js";

const initialState = {
    myNotes: [],
    favoriteNotes: [],
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

export const addToFavorite = createAsyncThunk("note/addToFavorite", async ({id}) => {
    const { data } = await axios.post("/note/addFavorite", {id});

    return data;
});

export const removeFromFavorite = createAsyncThunk("note/removeFromFavorite", async ({id}) => {
    const { data } = await axios.post("/note/removeFavorite", {id});

    return data;
});

export const getFavorites = createAsyncThunk("note/getFavorites", async () => {
    const { data } = await axios.get("/note/getFavorites");

    return data;
});

export const noteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        resetFullNoteState: (state, action) => {
            state.fullNote = action.type;
        },

        resetMessageState: state => {
            state.message = "";
        },

        resetMyNoteState: state => {
            state.myNotes = [];
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

        // Get favorite notes

        [getFavorites.pending]: state => {
            state.loading = true;
        },
        [getFavorites.fulfilled]: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.favoriteNotes = action.payload.favoriteNotes;
        },
    },
});

export default noteSlice.reducer;
export const { resetFullNoteState } = noteSlice.actions;
export const { resetMessageState } = noteSlice.actions;
export const { resetMyNoteState } = noteSlice.actions;