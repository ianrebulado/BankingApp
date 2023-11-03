import React, {useState} from "react";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Sidebar from "./components/Sidebar/Sidebar"
import { MoreVertical } from 'lucide-react';
import { getNavItems } from "./components/Sidebar/getNavItems";
import { useLocation } from 'react-router-dom';
import BudgetApp from "./pages/BudgetApp/BudgetApp";

function App() {

  const user = 'Mae'
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSideBar = () =>{
      setSidebarOpen(!isSidebarOpen);
  }

  const { pathname } = useLocation();
  
  return (
        <main>
          <Sidebar isOpen={isSidebarOpen} navItems={getNavItems(user)} />
          {
            user === 'admin' ?
              (pathname === '/dashboard' ? (<AdminDashboard user={user} />) : null)
            :
              (
                pathname === '/account' ? (<ClientDashboard user={user} />) :
                pathname === '/expenses' ? (<BudgetApp />) : null
              )
          }
          <MoreVertical className="mobile-menu" onClick={toggleSideBar} />
        </main>
  )
}

export default App;
