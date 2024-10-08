import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show_popup: false,
    popup_content: null,
};

export const popupSlice = createSlice({
    name: 'popup',
    initialState,

    reducers: {
        setShowPopup: (state, action) => {
            state.show_popup = action.payload
        },
        setPopupContent: (state, action) => {
            state.popup_content = action.payload
        },

    },
});

export const { setShowPopup , setPopupContent } = popupSlice.actions;

export default popupSlice.reducer;
