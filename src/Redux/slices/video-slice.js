import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    videos: null,
    video_files: null,

};

export const videoSlice = createSlice({
    name: 'video',
    initialState,

    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setVideos: (state, action) => {
            state.videos = action.payload
        },
        setVideoFiles: (state, action) => {
            state.video_files = action.payload
        },

    },
});

export const { setLoading, setVideos, setVideoFiles } = videoSlice.actions;

export default videoSlice.reducer;
