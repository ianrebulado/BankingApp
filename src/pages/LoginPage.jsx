import React from "react";
import SignInForm from "./LoginPage/SignInForm";
import "../styles/css/loginpage.css";

export default function LoginPage() {
  return (
    <>
      <div className="login-page">
        <img className="home-img" src="/public/assets/1.jpg" />
        <div className="login-container">
          <div className="login-form">
            <img
              src="/public/assets/combi-dark-logo.png"
              alt="logo"
              className="home-logo"
            />
            <SignInForm />
          </div>
        </div>
      </div>
    </>
  );
}
