import React, {useState} from "react";
// import AdminDashboard from "./pages/AdminDashboard"
import ClientDashboard from "./pages/ClientDashboard";
import Sidebar from "./components/Sidebar/Sidebar"
import { MoreVertical } from 'lucide-react';
import { getNavItems } from "./components/Sidebar/getNavItems";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BudgetApp from "./pages/BudgetApp/BudgetApp";

function App() {

  const user = 'Mae'
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSideBar = () =>{
      setSidebarOpen(!isSidebarOpen);
  }
  

  return (
    <>
      <Router>
        <main>
          <Sidebar isOpen={isSidebarOpen} navItems={getNavItems(user)} />
          <Switch>
            <Route path="/expenses" component={BudgetApp} />
          </Switch>
          {/* <AdminDashboard user={'Admin'} /> */}
          <ClientDashboard user={user} />
          <MoreVertical className="mobile-menu" onClick={toggleSideBar} />
        </main>
      </Router>
    </>
  )
}

export default App
