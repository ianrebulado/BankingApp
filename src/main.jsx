import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/styles.scss";

import SignupPage from "./pages/LoginPage/SignupPage.jsx";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";
import AdminLayout from "./pages/AdminDashboard/AdminLayout";
import Accounts from "./pages/AdminDashboard/Accounts";
import Transactions from "./pages/AdminDashboard/Transactions";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";

const signedInUser = JSON.parse(localStorage.getItem("SignedInUser"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/admindashboard",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Accounts user={signedInUser} />,
      },
      {
        path: "/admindashboard/expenses",
        element: <Transactions />,
      },
    ],
  },
  {
    path: "/clientDashboard",
    element: <ClientDashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
