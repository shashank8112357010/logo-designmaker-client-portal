import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp, ForgetPassword } from "../pages/auth";
import NoPageFound from "../pages/NoPageFound";
const routes = [
  {
    title: "auth page",
    layout: "auth",
    pages: [
      { name: "sign in", path: "/sign-in", element: <SignIn />, },
      { name: "sign up", path: "/sign-up", element: <SignUp />, },
      { name: "forget password", path: "/forget-password", element: <ForgetPassword />, },
    ],
  },
]

export function Auth() {

  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route exact path={path} element={element} />
            ))
        )}
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </div>
  );
}

Auth.displayName = "/src/layout/Auth.jsx";

export default Auth;
