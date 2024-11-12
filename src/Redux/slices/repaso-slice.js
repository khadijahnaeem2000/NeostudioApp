import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    repaso_folders: null,

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


    },
});

export const { setLoading, setRepasoFolders } = repasoSlice.actions;

export default repasoSlice.reducer;
