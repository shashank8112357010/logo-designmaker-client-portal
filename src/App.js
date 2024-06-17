import { Route, Routes, Navigate,useLocation } from "react-router-dom";
import { Auth } from "../src/layouts/auth"
import AccountSetup from "./pages/accountSetup/AccountSetup";
import Dashboard from "./layouts/dashboard";
import Overview from "./pages/dashboard/Overview";
import TicketMain from "./pages/dashboard/Ticket/TicketMain";
import EditProfile from "./pages/dashboard/Profile/Setting";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "./App.css";


function App() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames="fade"
      >
        <Routes location={location}>
          <Route path="/auth/*" element={<Auth />} />
          <Route path="*" element={<Navigate to="/auth/sign-up" replace />} />
          <Route path="/accountsetup" element={<AccountSetup />} />
          <Route path="/dashboard/home" element={<Dashboard />} />
          <Route path="/dashboard/overview" element={<Overview />} />
          <Route path="/dashboard/help" element={<TicketMain />} />
          <Route path="/dashboard/settings" element={<EditProfile />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

export default App;
