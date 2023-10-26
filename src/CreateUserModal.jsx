import React, { useEffect, useState } from "react";
import "./App.css";

export default function CreateUserModal(props) {
  const [formState, setFormState] = useState({
    fullname: "",
    username: "",
    password: "",
    email: "",
    amount: "",
  });

  const [inputErrors, setInputErrors] = useState({
    fullname: false,
    username: false,
    password: false,
    email: false,
    amount: false,
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: false,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    let hasErrors = false;
    const newErrors = {};

    for (const field in formState) {
      if (formState[field] === "") {
        hasErrors = true;
        newErrors[field] = true;
      }
    }

    if (hasErrors) {
      setInputErrors(newErrors);
      alert('Please fill in all the fields');
      return;
    }

    console.log("handle submit", formState);

    const userKey = formState.username;
    localStorage.setItem(userKey, JSON.stringify(formState));

    setFormState({
      fullname: "",
      username: "",
      password: "",
      email: "",
      amount: "",
    });
    
  }

  function handleClose() {
    setFormState({
      fullname: "",
      username: "",
      password: "",
      email: "",
      amount: "",
    });
    setInputErrors({
        fullname: false,
        username: false,
        password: false,
        email: false,
        amount: false,
      });
    props.onClose();
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
              className={inputErrors.fullname ? "error" : ""}
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
              className={inputErrors.username ? "error" : ""}
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
              className={inputErrors.password ? "error" : ""}
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
              className={inputErrors.email ? "error" : ""}
            />
            <label>Amount</label>
            <input
              type="number"
              name="amount"
              required
              onChange={handleInputChange}
              value={formState.amount}
              inputMode="none"
              className={inputErrors.amount ? "error" : ""}
            />
          </form>
        </div>
        <div className="modal-footer">
          <button type="submit" onClick={handleSubmit}>
            Create
          </button>
          <button onClick={handleClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
