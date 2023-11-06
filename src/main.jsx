import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignupPage from "./pages/SignupPage.jsx";
import AdminDashboard from "./pages//AdminDashboard/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard/ClientDashboard";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import "./styles/styles.scss";

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
      <>
        <AdminDashboard />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: <ClientDashboard />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
