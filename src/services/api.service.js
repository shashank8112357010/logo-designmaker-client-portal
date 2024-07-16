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
    const response =await axios.post(`http://localhost:4000/api/dashboard/requirements/${data.userId}`, data);
    return response;
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
    try {
        const response = await axios.get('http://localhost:4000/api/dashboard/userDetailsAndReq');
        return response.data;
    } catch (error) {
        console.error('Error fetching account setup data:', error);
        throw error;
    }
};

export const updateChoices= async (data) => {
    return await axios.put(`http://localhost:4000/api/dashboard/editRequirements`, data);
};

const api = axios.create({
   
    baseURL: "http://localhost:4000/api/dashboard",
    withCredentials: true,

});

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);


//ticket api 

export const createTicket = async (ticketData) => {
    return await axios.post('http://localhost:4000/api/ticket/createTicket', ticketData);
   
};

export const getAllTickets = async ({ pageNum = 1, status = '', ticketTitle = '' }) => {
    const response = await axios.get('http://localhost:4000/api/ticket/getAll', {
        params: { pageNum, status, ticketTitle }
    });
    return response.data;
};

export const getTicketById = async (ticket) => {
    try {
        const response = await axios.get(`http://localhost:4000/api/ticket/openTicket/${ticket}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch ticket by ID');
    }
};

export const addReplyToTicket = async ({ticketId, replyBody}) => {
    try {
        const response = await axios.post('http://localhost:4000/api/ticket/reply', { ticketId, replyBody });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to add reply to ticket');
    }
};

export const searchTickets = async ({ticketTitle,ticketNumber, pageNum, status}) => {
    try {
        const response = await axios.get('http://localhost:4000/api/ticket/searchTicket',{
            params: {ticketTitle,ticketNumber, pageNum, status }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to add reply to ticket');
    }
};

export const closeTicket = async (ticketId) => {
    const response = await axios.put(`http://localhost:4000/api/ticket/close/${ticketId}`);
    return response.data;
};