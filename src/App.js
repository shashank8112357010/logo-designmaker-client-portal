import { Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "../src/layouts/auth"
import AccountSetup from "./pages/accountSetup/AccountSetup";
import Dashboard from "./layouts/dashboard";
import ResetPassword from "./pages/auth/ResetPassword";
import axios from "axios";
import { getToken } from "./helpers/token.helper"
import NoPageFound from "./pages/NoPageFound";
import GoogleAuthCallback from "./pages/auth/signin/GoogleAuthCallback";
// import { GoogleOAuthProvider } from "@react-oauth/google";

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
      {/* <GoogleOAuthProvider clientId="624185740596-54nkdg30q57dgm2m9231vggunfkps9f8.apps.googleusercontent.com"> */}
      <Routes>
        <Route path="/" element={<Navigate to="/auth/sign-in" />} />
        <Route path="*" element={<NoPageFound />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/accountsetup" element={<AccountSetup />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/GoogleAuthCallback" element={<GoogleAuthCallback />} />
      </Routes>
      {/* </GoogleOAuthProvider> */}
    </>
  );
}

export default App;
