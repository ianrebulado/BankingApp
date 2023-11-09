import React from "react";
import SignInForm from "./Forms/SignInForm";
import home from '../../../public/1.jpg'
import logo from '../../../public/combi-dark-logo.png'

export default function LoginPage() {
  return (
    <>
      <div className="login-page">
        <img className="home-img" src={home} />
        <div className="login-container">
          <img
            src={logo}
            alt="logo"
            className="home-logo"
            />
          <div className="login-form">
            <SignInForm className={'sign-in-form'} />
          </div>
          <div className="login-page-footer">
            <span>Bankwise is regulated by the Bangko Sentral ng Pilipinas. For inquiries and comments, please contact our24-Hour Customer Service.</span>
            <span> A proud member of BancNet and PDIC. </span>
            <span>Deposits are insured by PDIC up to PHP 500,000 per depositor.</span>
          </div>
        </div>
      </div>
    </>
  );
}
