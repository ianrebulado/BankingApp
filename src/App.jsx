import React, {useState} from "react";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Sidebar from "./components/Sidebar/Sidebar"
import { MoreVertical } from 'lucide-react';
import { useLocation } from 'react-router-dom';

function App() {

  const user = 'Mae'
  // const [isSidebarOpen, setSidebarOpen] = useState(false);
  // const toggleSideBar = () =>{
  //     setSidebarOpen(!isSidebarOpen);
  // }

  // const { pathname } = useLocation();
  
  return (
        <main>
          <ClientDashboard user={user} />
          {/* <MoreVertical className="mobile-menu" onClick={toggleSideBar} /> */}
        </main>
  )
}

export default App;
