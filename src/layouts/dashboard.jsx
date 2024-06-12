import React from 'react';
import {Home,Sidebar} from '../pages/dashboard';

const Dashboard = () => {
  return (
    <div className="relative">
      <Sidebar />
      <Home />
    </div>
  );
};

export default Dashboard;