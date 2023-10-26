// import AdminDashboard from "./pages/AdminDashboard"
import ClientDashboard from "./pages/ClientDashboard"
import './styles/css/styles.css'

function App() {

  return (
    <>
      <main>
        {/* <AdminDashboard user={'Admin'} /> */}
        <ClientDashboard user={'User'} />
      </main>
    </>
  )
}

export default App
