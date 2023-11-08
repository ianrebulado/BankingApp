import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { LayoutDashboard, ArrowRightLeft } from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";
import { MoreVertical } from "lucide-react";

const adminNavItems = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard className="nav-icon" />,
    link: "/admindashboard",
  },
  {
    label: "Transactions",
    icon: <ArrowRightLeft className="nav-icon" />,
    link: "/admindashboard/expenses",
  },
];

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSideBar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <section className="admin-layout">
      <Sidebar isOpen={isSidebarOpen} navItems={adminNavItems} />
      <Outlet />
      <MoreVertical className="mobile-menu" onClick={toggleSideBar} />
    </section>
  );
}
