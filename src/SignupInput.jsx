import React, { useEffect, useState } from "react";

export default function SignupInput() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log("handle submit", formState);
    localStorage.setItem(formState.username, JSON.stringify(formState));
    setFormState({ username: "", password: "", email: "" });
  }

  useEffect(() => {
    console.log("use effect", formState);
  }, [formState]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form" method="post">
        <label> Username </label>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={handleInputChange}
          value={formState.username}
          autoComplete="off"
        />
        <label> Password </label>
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleInputChange}
          value={formState.password}
          autoComplete="off"
        />
        <label> Email Address </label>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleInputChange}
          value={formState.email}
          autoComplete="off"
        />
        <button type="submit"> Sign Up </button>
      </form>
    </div>
  );
}
