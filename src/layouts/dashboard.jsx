import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Overview, TicketMain, Setting, Header, Sidebar, Services, File, Transaction, Refunds, ScheduleMeeting } from '../pages/dashboard';
import { useSelector } from 'react-redux';

const routes = [
  {
    title: 'dashboard page',
    layout: 'dashboard',
    pages: [
      { name: 'Overview', path: '/overview', element: <Overview /> },
      { name: 'Services', path: '/services', element: <Services /> },
      { name: 'HelpDesk', path: '/help', element: <TicketMain /> },
      { name: 'Refunds', path: '/help/refunds', element: <Refunds /> },
      { name: 'Setting', path: '/settings', element: <Setting /> },
      { name: 'File', path: '/files', element: <File /> },
      { name: 'Transaction', path: '/transactions', element: <Transaction /> },
      { name: 'ScheduleMeet', path: '/schedule-meeting', element: <ScheduleMeeting /> }, // New route
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
    case '/dashboard/help/refunds':
      return 'HelpDesk';
    case '/dashboard/settings':
      return 'Settings';
    case '/dashboard/files':
      return 'Files';
    case '/dashboard/transactions':
      return 'Transactions';
    case '/dashboard/schedule-meeting': // New case
      return 'Schedule Meeting';
    default:
      return 'Login Dashboard';
  }
};

export function Dashboard() {
  const location = useLocation();
  const heading = getHeading(location.pathname);
  const token = useSelector((state) => state.account.token);

  if (!token) {
    return <Navigate to='/auth/sign-in' />;
  }

  return (
    <div className=''>
      <div className='flex bg-primaryBlack flex-row relative'>
        <Sidebar />
        <div className='lg:ml-[16.7%] lg:w-[83.3%] w-full bg-primaryBlack min-h-screen flex-1 flex flex-col flex-grow absolute border-l-2 border-secondaryBlack'>
          <Header heading={heading} />
          <Routes>
            {routes.map(
              ({ layout, pages }) =>
                layout === 'dashboard' &&
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

Dashboard.displayName = '/src/layout/Dashboard.jsx';

export default Dashboard;
