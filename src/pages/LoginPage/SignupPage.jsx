import React from 'react'
import SignUpForm from "./Forms/SignUpForm";
import home from '../../../public/1.jpg'
import logo from '../../../public/combi-dark-logo.png'

export default function SignupPage() {
  return (
    <>
      <div className="login-page">
        <img className="home-img" src={home} />
        <div className="login-container">
            <div className="title-container">
              <h1 className='form-title'>Register</h1>
              <img
                src={logo}
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
