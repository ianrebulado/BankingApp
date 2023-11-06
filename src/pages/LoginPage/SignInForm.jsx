import { useState } from "react";
import { Button, InputField } from "../../components";
import { FormProvider } from "../../components/Global/Form/FormContext";
import { usersModel } from "../../lib/constants";
import { validateSignInForm } from "../../lib/utils/validations";
import { Link, useNavigate} from "react-router-dom";
import SignupPage from "../SignupPage";
import { userSignedIn } from "../../lib/utils/users";

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

export function updateLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

export default function SignInForm() {
  const [inputState, setInputState] = useState(inputs);
  const [formState, setFormState] = useState({
    username: null,
    password: null,
  });

  const navigate = useNavigate()

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
      const SignedInUser = userSignedIn(formState.username, formState.password);
      const userRole = SignedInUser.role 
      userRole === 'admin' ? navigate('/admindashboard') : navigate('/dashboard') 
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
