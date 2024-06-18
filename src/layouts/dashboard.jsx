import React from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import { Overview, Ticket, Setting, Header, Sidebar, Services } from "../pages/dashboard";
import Home from '../pages/dashboard/Home';

const routes = [
  {
    title: "dashboard page",
    layout: "dashboard",
    pages: [
      { name: "Home", path: "/home", element: <Home /> },
      { name: "Overview", path: "/overview", element: <Overview /> },
      { name: "Services", path: "/services", element: <Services /> },
      { name: "HelpDesk", path: "/help", element: <Ticket /> },
      { name: "Setting", path: "/settings", element: <Setting /> },
    ],
  },
];

const getHeading = (path) => {
  switch (path) {
    case '/dashboard/overview':
      return 'Overview';
    case '/dashboard/services':
      return 'Services';
    case '/dashboard/help':
      return 'HelpDesk';
    case '/dashboard/settings':
      return 'Settings';
    default:
      return 'Overview';
  }
};

export function Dashboard() {
  const location = useLocation();
  const heading = getHeading(location.pathname);

  return (
    <div className="">
      <div className="flex bg-primaryBlack flex-row relative">
        <Sidebar />
        <div className="lg:ml-[16.7%] lg:w-[83.3%] w-full bg-primaryBlack min-h-screen flex-1 flex flex-col flex-grow absolute border-l-2 border-secondaryBlack">
          <Header heading={heading} />
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === "dashboard" &&
                pages.map(({ path, element }) => (
                  <Route key={path} exact path={path} element={element} />
                ))
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/Dasboard.jsx";

export default Dashboard;
