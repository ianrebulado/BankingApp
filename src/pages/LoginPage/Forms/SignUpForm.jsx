import { useState } from "react";
import { Button, InputField } from "../../../components";
import { FormProvider } from "../../../components/Global/Form/FormContext";
import { usersModel } from "../../../lib/constants";
import generateId from "../../../lib/utils/generateId";
import {
  clearValidationMessages,
  validateSignUpForm,
} from "../../../lib/utils/validations";
import { createUser } from "../../../lib/utils/users";
import { createUserFormInputs } from "../../../lib/constants";
import { Link, useNavigate } from "react-router-dom";
import { fetchUsers, storeUsers } from "../../../lib/utils/users";
import useLocalStorage from "../../../hooks/localStorage";

export default function SignUpForm() {
  const [usersData, setUsersData] = useLocalStorage("users", usersModel);
  const [inputState, setInputState] = useState(createUserFormInputs);
  const [formState, setFormState] = useState({
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    role: "client",
  });

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    let isValidForm = false;

    clearValidationMessages(inputState, setInputState);

    isValidForm = validateSignUpForm(
      inputState,
      setInputState,
      formState,
      usersModel
    );

    if (isValidForm) {
      usersData.push(createUser(formState));
      setUsersData([...usersData]);

      //Add toast
      navigate("/");
    } else {
      console.log("Form is not valid");
      //Add toast
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
          <Button type={"submit"} text={"Create Account"} />
          <span className="sign-up-link">
            <Link to="/">Go Back to Login Page</Link>
          </span>
        </div>
      </form>
    </FormProvider>
  );
}
