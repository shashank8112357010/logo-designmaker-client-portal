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
    return await axios.post(`http://localhost:4000/api/dashboard/requirements/${data.user.userId}`, data);
};

export const updateUserProfile = async (data) => {
    try {
        const response = await axios.put('http://localhost:4000/api/dashboard/editProfile', data);
        return response.data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};
export const updatePassword = async ({currentPassword, newPassword}) => {
    return await axios.put(`http://localhost:4000/api/dashboard/changePassword`, {currentPassword, newPassword});
};

export const toggleTwoFactorAuth = async (isEnabled) => {
    return await axios.post(`http://localhost:4000/api/dashboard/enableTwoFactor?twoFactor=${isEnabled}`);
};

export const updatePreferences= async ({isGeneralNotification,isPlatformUpdates,isPromotions}) => {
    return await axios.put(`http://localhost:4000/api/dashboard/setPreferences?generalNotification=${isGeneralNotification}&promotion=${isPromotions}&platformUpdates=${isPlatformUpdates}`);
};

export const getAccountSetupData = async () => {
    return await axios.get(`http://localhost:4000/api/dashboard/userDetailsAndReq`);
};

export const updateChoices= async (data) => {
    return await axios.put(`http://localhost:4000/api/dashboard/editRequirements`, data);
};

