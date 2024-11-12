import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    pdf_folders: null,
    pdf_files: null,
    topics: null

};

export const temarioSlice = createSlice({
    name: 'temario',
    initialState,

    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setPdfFolders: (state, action) => {
            state.pdf_folders = action.payload
        },
        setPdfFiles: (state, action) => {
            state.pdf_files = action.payload
        },

    },
});

export const { setLoading, setPdfFolders, setPdfFiles } = temarioSlice.actions;

export default temarioSlice.reducer;
