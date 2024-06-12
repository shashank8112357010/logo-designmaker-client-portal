import { Route, Routes, Navigate } from "react-router-dom";
import { Auth } from "../src/layouts/auth"
import AccountSetup from "./pages/accountSetup/AccountSetup";
import Dashboard from "./layouts/dashboard";
import Overview from "./pages/dashboard/Overview";



function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth/sign-up" replace />} />
        <Route path="/accountsetup" element={<AccountSetup />} />
        <Route path="/dashboard/home" element={<Dashboard />} />
        <Route path="/dashboard/overview" element={<Overview />} />
      </Routes>
    </>
  );
}

export default App;
