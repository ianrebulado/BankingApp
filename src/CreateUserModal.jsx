import React, { useEffect, useState } from 'react';

export default function CreateUserModal(props) {
  const [formState, setFormState] = useState({
    fullname: '',
    username: '',
    password: '',
    email: '',
    amount: '',
  });

 
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log('handle submit', formState);

   
    const userKey = formState.username; 
    localStorage.setItem(userKey, JSON.stringify(formState));

    
    setFormState({
      fullname: '',
      username: '',
      password: '',
      email: '',
      amount: '',
    });
  }

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Create User</h4>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit} method="post">
            <label>Full Name</label>
            <input
              type="text"
              required
              autoComplete="off"
              name="fullname"
              placeholder="Full Name"
              onChange={handleInputChange}
              value={formState.fullname}
            />
            <label>Username</label>
            <input
              type="text"
              required
              autoComplete="off"
              name="username"
              placeholder="Username"
              onChange={handleInputChange}
              value={formState.username}
            />
            <label>Password</label>
            <input
              type="password"
              required
              autoComplete="off"
              name="password"
              placeholder="Password"
              onChange={handleInputChange}
              value={formState.password}
            />
            <label>Email</label>
            <input
              type="email"
              required
              autoComplete="off"
              name="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={formState.email}
            />
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              required
              onChange={handleInputChange}
              value={formState.amount}
            />
          </form>
        </div>
        <div className="modal-footer">
          <button type="submit" onClick={handleSubmit}>
            Create
          </button>
          <button onClick={props.onClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
