import React, {useState} from "react";
import AdminDashboard from "./pages/AdminDashboard"
import Sidebar from "./components/Sidebar/Sidebar"
import { MoreVertical } from 'lucide-react';
// import ClientDashboard from "./pages/ClientDashboard"
import './styles/css/styles.css'
import { getNavItems } from "./components/Sidebar/getNavItems";

function App() {

  const user = 'admin'
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSideBar = () =>{
      setSidebarOpen(!isSidebarOpen);
  }
  

  return (
    <>
      <main>
        <Sidebar isOpen={isSidebarOpen} navItems={getNavItems(user)} />
        <AdminDashboard user={'Admin'} />
        {/* <ClientDashboard user={'User'} /> */}
        <MoreVertical className="mobile-menu" onClick={toggleSideBar} />
      </main>
    </>
  )
}

export default App
