import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import '../styles/css/errorpage.css';

export default function ErrorPage() {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 2500);

    return () => {
      clearTimeout(timer); 
    };
  }, []);

  return (
    <>
      <div className='error'>
        {showMessage && <h1>404. <br /> <br /> Hello, Stanley. </h1>}
      </div>

      {showMessage ? null : <Navigate to={'/'} />}
    </>
  );
}


