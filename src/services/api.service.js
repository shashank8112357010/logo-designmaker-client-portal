import axios from "axios";

const { REACT_API_URL } = process.env;

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


