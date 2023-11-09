import React from "react";
import SignInForm from "./Forms/SignInForm";
<<<<<<< HEAD
import bgImg from "../../../public/1.jpg";
import logo from "../../../public/combi-light-logo.png";
=======
import home from '../../../public/1.jpg'
import logo from '../../../public/combi-dark-logo.png'
>>>>>>> 0c11081735e1b580344c11229650fc9892edf746

export default function LoginPage() {
  return (
    <>
      <div className="login-page">
<<<<<<< HEAD
        <img className="home-img" src={bgImg} />
        <div className="login-container">
          <img src={logo} alt="logo" className="home-logo" />
=======
        <img className="home-img" src={home} />
        <div className="login-container">
          <img
            src={logo}
            alt="logo"
            className="home-logo"
            />
>>>>>>> 0c11081735e1b580344c11229650fc9892edf746
          <div className="login-form">
            <SignInForm className={"sign-in-form"} />
          </div>
          <div className="login-page-footer">
            <span>
              Bankwise is regulated by the Bangko Sentral ng Pilipinas. For
              inquiries and comments, please contact our24-Hour Customer
              Service.
            </span>
            <span> A proud member of BancNet and PDIC. </span>
            <span>
              Deposits are insured by PDIC up to PHP 500,000 per depositor.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
