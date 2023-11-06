import React, {useState, useEffect} from "react";
// import AdminDashboard from "./pages/AdminDashboard";
// import ClientDashboard from "./pages/ClientDashboard";

import { initialUsers } from "./lib/utils/users";
import LoginPage from "./pages/LoginPage";


function App() {

  useEffect(()=> initialUsers(), [])
  
  return (
        <main>
          <LoginPage/>
        </main>
  )
}

export default App;
