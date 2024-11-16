import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    exams: null

};

export const examSlice = createSlice({
    name: 'exam',
    initialState,

    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setExams: (state, action) => {
            state.exams = action.payload
        },


    },
});

export const { setLoading, setexamFolders, setExams } = examSlice.actions;

export default examSlice.reducer;
