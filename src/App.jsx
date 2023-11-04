import React, {useEffect, useState} from "react";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";
// import Sidebar from "./components/Sidebar/Sidebar"
import { MoreVertical } from 'lucide-react';
// import { getNavItems } from "./components/Sidebar/getNavItems";
import { useLocation } from 'react-router-dom';
import BudgetApp from "./pages/BudgetApp/BudgetApp";
import { storeInitialExpenses } from "./lib/utils/expenses";
import expensesModel from './lib/constants/expensesModel.json';

function App() {

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSideBar = () =>{
      setSidebarOpen(!isSidebarOpen);
  }

  useEffect(()=>{
    storeInitialExpenses(expensesModel);
  },[])
  
  return (
        <main>
          {/* <BudgetApp /> */}
          <ClientDashboard />
          <MoreVertical className="mobile-menu" onClick={toggleSideBar} />
        </main>
  )
}

export default App;
