import { Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "../src/layouts/auth";
import AccountSetup from "./pages/accountSetup/AccountSetup";
import Dashboard from "./layouts/dashboard";
import ResetPassword from "./pages/auth/ResetPassword";
import axios from "axios";
import { getToken, getRefreshToken, saveToken, saveRefreshToken } from "./helpers/token.helper";
import NoPageFound from "./pages/NoPageFound";
// import { setToken } from "./store/accountSlice";
import { getState, useLogout,logout } from './helpers/store.helper';

// Function to refresh the token
const refreshAuthLogic = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }
  const response = await axios.post('http://localhost:4000/api/dashboard/token', { refreshToken });
  saveToken(response.data.token);
  // dispatchEvent(setToken(response.data.token))
  saveRefreshToken(response.data.refreshToken);
  return response.data.token;
};

// Axios interceptor for requests
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios interceptor for responses
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response)

    // Get userId from Redux store
    const state = getState();
    const userId = state.account.userId;

    console.log(originalRequest.url);
    console.log(error.response.data.isTokenInvalid);

    // checking if status code 401 is coming from sign-in
    if (originalRequest.url.includes('/login') && error.response.status === 401) {
      return Promise.reject(error);
    }

    if (originalRequest.url.includes('/changePassword') && error.response.status === 401) {
      return Promise.reject(error);
    }

    if (originalRequest.url.includes(`/verifyOTP/${userId}`) && error.response.status === 401) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && error.response.data.isTokenInvalid === true) {
      console.log('Pagging logout')
      // const logout = useLogout();
      logout();
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAuthLogic();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/sign-in" />} />
        <Route path="*" element={<NoPageFound />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/accountsetup" element={<AccountSetup />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        {/* <Route path="/auth/GoogleAuthCallback" element={<GoogleAuthCallback />} /> */}
      </Routes>
    </>
  );
}

export default App;
