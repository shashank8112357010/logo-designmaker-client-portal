import { Route, Routes, Navigate } from "react-router-dom";
import { Auth } from "../src/layouts/auth"
import AccountSetup from "./pages/accountSetup/AccountSetup";
import Dashboard from "./layouts/dashboard";
import Overview from "./pages/dashboard/Overview";
import Ticket from "./pages/dashboard/Ticket/Ticket";
import EditProfile from "./pages/dashboard/Profile/Setting";



function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth/sign-up" replace />} />
        <Route path="/accountsetup" element={<AccountSetup />} />
        <Route path="/dashboard/home" element={<Dashboard />} />
        <Route path="/dashboard/overview" element={<Overview />} />
        <Route path="/dashboard/help" element={<Ticket />} />
        <Route path="/dashboard/settings" element={<EditProfile />} />
      </Routes>
    </>
  );
}

export default App;
