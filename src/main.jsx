import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./styles/styles.scss";

import ProtectedRoute from "./ProtectedRoute";
import SignupPage from "./pages/LoginPage/SignupPage";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";
import AdminLayout from "./pages/AdminDashboard/AdminLayout";
import Accounts from "./pages/AdminDashboard/Accounts";
import Transactions from "./pages/AdminDashboard/Transactions";
import LoginPage from "./pages/LoginPage/LoginPage";
import BudgetApp from "./pages/BudgetApp/BudgetApp";
import UserAccount from "./pages/ClientDashboard/UserAccount";
import ErrorPage from "./pages/ErrorPage";

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
    element: (
      <ProtectedRoute requiredRole={"admin"}>
        <AdminLayout />
      </ProtectedRoute>
    ),
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
    path: "/dashboard",
    element: (
      <ProtectedRoute requiredRole={"client"}>
        <ClientDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <UserAccount />
      },
      {
        path: "/dashboard/expenses",
        element: <BudgetApp />
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
