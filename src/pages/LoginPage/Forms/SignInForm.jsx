import React, { useState } from "react";
import { Button, InputField } from "../../../components";
import { FormProvider } from "../../../components/Global/Form/FormContext";
import { validateSignInForm } from "../../../lib/utils/validations";
import { Link, useNavigate } from "react-router-dom";
import { userSignedIn } from "../../../lib/utils/users";
import { usersModel } from "../../../lib/constants";
import { signInInputs } from "../../../lib/constants/globals";
import useLocalStorage from "../../../hooks/localStorage";

export default function SignInForm() {
  const usersData = useLocalStorage("users", usersModel)[0];
  const setUsername = useLocalStorage("username", "")[1];
  const setSignedIn = useLocalStorage("signedIn", false)[1];
  const setSignedInUser = useLocalStorage("SignedInUser", [])[1];

  const [inputState, setInputState] = useState(signInInputs);
  const [formState, setFormState] = useState({
    username: null,
    password: null,
  });

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    let isValidForm = validateSignInForm(
      inputState,
      setInputState,
      formState,
      usersData
    );

    if (isValidForm) {
      await setUsername(formState.username);
      await setSignedIn(true);

      const SignedInUser = userSignedIn(formState.username, formState.password);

      if (SignedInUser) {
        await setSignedInUser(SignedInUser);
      } else {
        localStorage.removeItem("SignedInUser");
      }

      const userRole = SignedInUser.role;

      userRole === "admin"
        ? navigate("/admin/dashboard")
        : navigate("/dashboard");
    }
  }

  function handleInputChange(name, value) {
    setFormState({ ...formState, [name]: value });
  }

  return (
    <FormProvider formValues={formState} handleInputChange={handleInputChange}>
      <form onSubmit={handleSubmit}>
        {inputState.map(
          ({ type, label, name, placeholder, message }, index) => (
            <InputField
              key={index}
              type={type}
              label={label}
              name={name}
              placeholder={placeholder}
              message={message}
            />
          )
        )}
        <div className="buttons-container">
          <Button type={"submit"} text={"Sign In"} />
          <SignupLink />
        </div>
      </form>
    </FormProvider>
  );
}

function SignupLink() {
  return (
    <span className="sign-up-link">
      <Link to="/signup">Not yet a member? Sign up!</Link>
    </span>
  );
}
