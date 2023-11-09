import React from "react";
import SignUpForm from "./Forms/SignUpForm";
import bgImg from "../../../public/1.jpg";
import logo from "../../../public/combi-light-logo.png";

export default function SignupPage() {
  return (
    <>
      <div className="login-page">
        <img className="home-img" src={bgImg} />
        <div className="login-container">
          {/* <h1 className='form-title'>Register</h1> */}
          <img src={logo} alt="logo" className="home-logo" />
          <div className="login-form">
            <SignUpForm className={"sign-in-form"} />
          </div>
        </div>
      </div>
    </>
  );
}
