import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    repaso_folders: null,
    repaso_exams: null

};

export const repasoSlice = createSlice({
    name: 'repaso',
    initialState,

    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setRepasoFolders: (state, action) => {
            state.repaso_folders = action.payload
        },
        setRepasoExams: (state, action) => {
            state.repaso_exams = action.payload
        },


    },
});

export const { setLoading, setRepasoFolders, setRepasoExams } = repasoSlice.actions;

export default repasoSlice.reducer;
