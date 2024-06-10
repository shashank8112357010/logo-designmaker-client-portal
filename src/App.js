import { Route, Routes, Navigate } from "react-router-dom";
import { Auth } from "../src/layouts/auth"
import { AccountSetup } from "../src/layouts/accountSetup"


function App() {
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={<Auth />} />
        {/* <Route path="*" element={<Navigate to="/auth/sign-up" replace />} /> */}
        <Route path="/accountsetup/*" element={<AccountSetup />} />
      </Routes>
    </>
  );
}

export default App;
