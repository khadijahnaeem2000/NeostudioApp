import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    classes: null,
    topics: null

};

export const classesSlice = createSlice({
    name: 'classes',
    initialState,

    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setClasses: (state, action) => {
            state.classes = action.payload
        },
        setTopics: (state, action) => {
            state.topics = action.payload
        },

    },
});

export const { setLoading, setClasses, setTopics } = classesSlice.actions;

export default classesSlice.reducer;
