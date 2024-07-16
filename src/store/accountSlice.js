import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: '',
    lastName: '',
    businessName: '',
    brandName: '',
    slogan: '',
    designRequirements: [],
    niche: [],
    other: '',
    fontOptions: [],
    colorOptions: [],
    user: null,
    token: null,
    refreshToken: null,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            return { ...state, ...action.payload };
        },
        setUser: (state, action) => {
            const { user, token,refreshToken } = action.payload;
            state.user = user;
            state.token = token;
            state.refreshToken= refreshToken;
            localStorage.setItem('token', token); 
            localStorage.setItem('refreshToken', refreshToken); 
            localStorage.setItem('user', JSON.stringify(user)); 
        },
        setUsername: (state, action) => {
           const username = action.payload;
           state.user.username = username;
        },
        setupFields: (state, action) => {
            const { firstName, lastName, designRequirements, businessName, brandName, slogan, niche, other, fontOptions, colorOptions } = action.payload;
            state.firstName = firstName;
            state.lastName = lastName;
            state.businessName = businessName;
            state.brandName = brandName;
            state.slogan = slogan;
            state.designRequirements = designRequirements;
            state.niche = niche;
            state.other = other;
            state.fontOptions = fontOptions;
            state.colorOptions = colorOptions;
        },
        removeToken: (state) => {
            state.token = null;
            state.user = null;
            Object.assign(state, initialState);
            localStorage.removeItem('token');
            localStorage.removeItem('refreseToken');
            localStorage.removeItem('user');
        },
        resetFormData: () => initialState,
        updateProfileField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },
        setToken: (state, action) => {
            const token = action.payload;
            state.token = token;
            localStorage.setItem('token', token);
        },
        setRefreshToken: (state, action) => {
            const refreshToken = action.payload;
            state.refreshToken = refreshToken;
            localStorage.setItem('refreshToken', refreshToken);
        },
        updateTwoFactor: (state, action) => {
            state.user.twoFactor = action.payload;
        },
        updateNotification: (state, action) => {
            state.user.generalNotification = action.payload.generalNotification;
            state.user.platformUpdates = action.payload.platformUpdates;
            state.user.promotion = action.payload.promotion;
        },
    },
});

export const { updateFormData, setUser, removeToken, resetFormData, updateProfileField, setToken, setRefreshToken, updateTwoFactor, updateNotification, setupFields } = accountSlice.actions;

export default accountSlice.reducer;
