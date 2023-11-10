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
import ErrorPage from "./pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute requiredRole={"admin"}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
    
      {
        path:"/admin/dashboard",
        element: <Accounts />,
        errorElement: <ErrorPage />
      },
      {
        path: "/admin/transactions",
        element: <Transactions />,
        errorElement: <ErrorPage />
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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <UserAccount />,
        errorElement: <ErrorPage />
      },
      {
        path: "/dashboard/expenses",
        element: <BudgetApp />,
        errorElement: <ErrorPage />
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
    errorElement: <ErrorPage />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
