import React from "react";
import SignInForm from "./Forms/SignInForm";

export default function LoginPage() {
  return (
    <>
      <div className="login-page">
        <img className="home-img" src="/public/assets/1.jpg" />
        <div className="login-container">
          <img
            src="/public/assets/combi-dark-logo.png"
            alt="logo"
            className="home-logo"
            />
          <div className="login-form">
            <SignInForm className={'sign-in-form'} />
          </div>
        </div>
      </div>
    </>
  );
}
