import { useState } from "react";
import { Button, InputField } from "../../components";
import { FormProvider } from "../../components/Global/Form/FormContext";
import { usersModel } from "../../lib/constants";
import { validateSignInForm } from "../../lib/utils/validations";
import { Link } from "react-router-dom";
import SignupPage from "../SignupPage";

const inputs = [
  {
    type: "text",
    label: "Username",
    name: "username",
    placeholder: "Username",
    isRequired: true,
    message: "",
  },
  {
    type: "password",
    label: "Password",
    name: "password",
    placeholder: "Password",
    isRequired: true,
    message: "",
  },
];

function updateLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export default function SignInForm() {
  const [inputState, setInputState] = useState(inputs);
  const [formState, setFormState] = useState({
    username: null,
    password: null,
  });

  function handleSubmit(e) {
    e.preventDefault();
    let validUser = validateSignInForm(
      inputState,
      setInputState,
      formState,
      usersModel
    );

    if (validUser) {
      updateLocalStorage("username", formState.username);
      updateLocalStorage("signedIn", true);
      userSignedIn(formState.username, formState.password)
    }
  }

  function userSignedIn(username, password) {
    
    const user = usersModel.find((u) => u.username === username && u.password === password);
  
    if (user) {
      console.log('Signed In User:', user);
      updateLocalStorage('SignedInUser', JSON.stringify(user));
      } else {
      localStorage.removeItem('SignedInUser')
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
        <Button type={"submit"} text={"Sign In"} />
        
        <SignupLink />

      </form>
    </FormProvider>
  );
}

function SignupLink () {
  return  <Link to='/signup'> Not yet a member? Sign up! </Link> 
}
