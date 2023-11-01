import AdminDashboard from "./pages/AdminDashboard";
// import ClientDashboard from "./pages/ClientDashboard";
import './styles/css/styles.css';
// import Sidebar from "./components/Sidebar/Sidebar"
import BudgetApp from "./pages/BudgetApp/BudgetApp";

function App() {

  return (
    <>
      <main>
        {/* <Sidebar navItems={'Dashboard'} /> */}
        {/* <AdminDashboard user={'Admin'} /> */}
        {/* <ClientDashboard user={'User'} /> */}
        <BudgetApp />
      </main>
    </>
  )
}

export default App
