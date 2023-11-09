import React from 'react'
import SignUpForm from "./Forms/SignUpForm";

export default function SignupPage() {
  return (
    <>
      <div className="login-page">
        <img className="home-img" src="/public/assets/1.jpg" />
        <div className="login-container">
            <div className="title-container">
              {/* <h1 className='form-title'>Register</h1> */}
              <img
                src="/public/assets/combi-dark-logo.png"
                alt="logo"
                className="sign-up-logo"
              />
            </div>
          <div className="login-form">
            <SignUpForm className={'sign-in-form'} />
          </div>
        </div>
      </div>
    </>
  );
}
