import { Routes, Route } from "react-router-dom";
import { AccountSetup1, AccountSetup2, AccountSetup3, AccountSetup4, AccountSetup5 } from "../pages/accountSetup";

const routes = [
  {
    title: "accountSetup page",
    layout: "accountSetup",
    pages: [
      { name: "step 1", path: "/step-1", element: <AccountSetup1 />, },
      { name: "step 2", path: "/step-2", element: <AccountSetup2 />, },
      { name: "step 3", path: "/step-3", element: <AccountSetup3 />, },
      { name: "step 4", path: "/step-4", element: <AccountSetup4 />, },
      { name: "step 5", path: "/step-5", element: <AccountSetup5 />, },
    ],
  },
]

export function AccountSetup() {

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "accountSetup" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
}

// AccountSetup.displayName = "/src/layout/accountSetup.jsx";

export default AccountSetup;
