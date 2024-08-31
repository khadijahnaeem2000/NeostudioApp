import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isDialogOpen: false,
    errorMessage: '',
};

export const dialogSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        setAuthDialog: (state, action) => {
            state.isDialogOpen = action.payload
        },
        setErrorMessage: (state, action) => {
            state.errorMessage = action.payload
        },

    },
});

export const { setAuthDialog, setErrorMessage } = dialogSlice.actions;

export default dialogSlice.reducer;
