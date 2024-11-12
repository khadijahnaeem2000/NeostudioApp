import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    audios: null,
    audio_files: null,

};

export const audioSlice = createSlice({
    name: 'audio',
    initialState,

    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setAudios: (state, action) => {
            state.audios = action.payload
        },
        setAudioFiles: (state, action) => {
            state.audio_files = action.payload
        },

    },
});

export const { setLoading, setAudios, setAudioFiles } = audioSlice.actions;

export default audioSlice.reducer;
