import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    classes: null,
    topics: null,
    meeting_status: null

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
        setMeetingStatus: (state, action) => {
            state.meeting_status = action.payload
        },

    },
});

export const { setLoading, setClasses, setTopics, setMeetingStatus } = classesSlice.actions;

export default classesSlice.reducer;
