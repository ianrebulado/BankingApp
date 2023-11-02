import React, {useState} from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import { MoreVertical } from 'lucide-react';
import { getNavItems } from "./components/Sidebar/getNavItems";
import BudgetApp from "./pages/BudgetApp/BudgetApp";

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
        <MoreVertical className="mobile-menu" onClick={toggleSideBar} />
        <BudgetApp />
      </main>
    </>
  )
}

export default App
