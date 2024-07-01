import axios from "axios";

// const { REACT_API_URL } = process.env;

export const signUp = async (data) => {
    return await axios.post(`http://localhost:4000/api/dashboard/register`, data);
};

export const signIn = async (data) => {
    return await axios.post(`http://localhost:4000/api/dashboard/login`, data);
};
export const signInOTPVerification = async ({ otp, userId }) => {
    return await axios.post(`http://localhost:4000/api/dashboard/verifyOTP/${userId}`, { otp });
};
export const resetPasswordLinkSend = async ({ workEmail }) => {
    return await axios.post(`http://localhost:4000/api/dashboard/resetPasswordLink`, { workEmail });
};
export const resetPassword = async ({ token, newPassword, confirmPassword }) => {
    return await axios.post(`http://localhost:4000/api/dashboard/resetPassword/${token}`, { newPassword, confirmPassword });
};
export const accountSetup = async (data) => {
    return await axios.post(`http://localhost:4000/api/dashboard/requirements/${data.userId}`, data);
};
export const updateUserProfile = async (data) => {
    return await axios.put(`http://localhost:4000/api/dashboard/editProfile`, data);
};

export const updatePassword = async ({currentPassword, newPassword}) => {
    return await axios.put(`http://localhost:4000/api/dashboard/changePassword`, {currentPassword, newPassword});
};

export const toggleTwoFactorAuth = async (isEnabled) => {
    return await axios.post(`http://localhost:4000/api/dashboard/twoFactor`, { twoFactorEnabled: isEnabled });
};

export const getAccountSetupData = async () => {
    return await axios.get(`http://localhost:4000/api/dashboard/userDetailsAndReq`);
};

export const updateChoices= async (data) => {
    return await axios.put(`http://localhost:4000/api/dashboard/editRequirements`, data);
};


