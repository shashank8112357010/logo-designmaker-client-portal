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
    token: null
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            return { ...state, ...action.payload };
        },


        setUser: (state, action) => {
            const { user, token, userId } = action.payload;
            state.user = user;
            state.userId = userId;
            state.token = token;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
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
            state.userId = null;
            Object.assign(state, initialState);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },

        resetFormData: () => initialState,

        updateProfileField: (state, action) => {
            const { field, value } = action.payload;
            state[field] = value;
        },

        // setToken: (state, action) => {
        //     const { token } = action.payload;
        //     state.token = token;
        //     localStorage.setItem('token', token);
        // },

        setToken: (state, action) => {
            const token = action.payload;
            state.token = token;
            localStorage.setItem('token', token);
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

export const { updateFormData, setUser, removeToken, resetFormData, updateProfileField, setToken, updateTwoFactor, updateNotification, setupFields } = accountSlice.actions;

export default accountSlice.reducer;
