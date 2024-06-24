import { Route, Routes, Navigate } from "react-router-dom";
import { Auth } from "../src/layouts/auth"
import AccountSetup from "./pages/accountSetup/AccountSetup";
import Dashboard from "./layouts/dashboard";
import ResetPassword from "./pages/auth/ResetPassword";
import axios from "axios";
import { getToken } from "./helpers/token.helper"
// axios interceptor

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


function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/accountsetup" element={<AccountSetup />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
