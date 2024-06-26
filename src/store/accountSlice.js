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
    user:null,
    userId : null,
    token : null
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
        setToken: (state, action) => {
           state.token = action.payload
        },
        removeToken: (state, action) => {
            state.token = action.payload
         },
        resetFormData: () => initialState,
    },
});

export const { updateFormData, setUser , setToken, removeToken ,resetFormData } = accountSlice.actions;
export default accountSlice.reducer;
