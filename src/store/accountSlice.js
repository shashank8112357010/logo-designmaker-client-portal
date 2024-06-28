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
    user: null,
    userId: null,
    email: '',
    phoneNumber: '',
    username: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    profileImg: {}
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            return { ...state, ...action.payload };
        },
        setUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetFormData: () => initialState,
        updateProfileField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        }
    },
});

export const { updateFormData, setUser, resetFormData, updateProfileField } = accountSlice.actions;
export default accountSlice.reducer;
