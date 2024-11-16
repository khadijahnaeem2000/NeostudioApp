import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    user_programs: null

};

export const activitySlice = createSlice({
    name: 'activity',
    initialState,

    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setUserPrograms: (state, action) => {
            state.user_programs = action.payload
        },


    },
});

export const { setLoading, setUserPrograms } = activitySlice.actions;

export default activitySlice.reducer;
