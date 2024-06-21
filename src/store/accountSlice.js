import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    lastName: '',
    businessName: '',
    brandName: '',
    slogan: '',
    designType: [],
    targetNiche: [],
    otherDetails: '',
    selectedFonts: [],
    selectedPalettes: [],
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetFormData: () => initialState,
    },
});

export const { updateFormData, resetFormData } = accountSlice.actions;
export default accountSlice.reducer;
