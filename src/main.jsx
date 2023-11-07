import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/LoginPage/SignupPage.jsx";
import AdminDashboard from "./pages//AdminDashboard/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import "./styles/styles.scss";
import ProtectedRoute from "./lib/utils/ProtectedRoute.jsx";

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
      <ProtectedRoute requiredRole={'admin'}>
        
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute requiredRole={'client'}>
        
        <ClientDashboard />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
