import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import { getNavItems } from "./components/Sidebar/getNavItems";
import { MoreVertical } from "lucide-react";

export default function AdminLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSideBar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <section>
        <Sidebar isOpen={isSidebarOpen} navItems={getNavItems(user)} />
        <div>
          <Outlet />
        </div>
        <MoreVertical className="mobile-menu" onClick={toggleSideBar} />
      </section>
    </>
  );
}
