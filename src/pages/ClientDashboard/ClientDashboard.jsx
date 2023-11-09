import React from 'react';
import { useState } from 'react';
import { LayoutDashboard, ArrowRightLeft, MoreVertical } from 'lucide-react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const navItems = [
  {
    label: "Account",
    icon: <LayoutDashboard className="nav-icon" />,
    link: "/dashboard",
  },
  {
    label: "Expenses",
    icon: <ArrowRightLeft className="nav-icon" />,
    link: "/dashboard/expenses",
  },
];

function ClientDashboard() {

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSideBar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='client-dashboard'>
      <Sidebar isOpen={isSidebarOpen} navItems={navItems} toggleSidebar={toggleSideBar} />
      <Outlet />
      <MoreVertical className="mobile-menu" onClick={toggleSideBar} />
    </div>
  );
}

export default ClientDashboard;