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

const inputs = [
  {
    type: "text",
    label: "Username",
    name: "username",
    placeholder: "JuanDeLaCruz",
    isRequired: true,
    message: "",
  },
  {
    type: "text",
    label: "First Name",
    name: "first_name",
    placeholder: "Juan",
    isRequired: true,
    message: "",
  },
  {
    type: "text",
    label: "Last Name",
    name: "last_name",
    placeholder: "De La Cruz",
    isRequired: true,
    message: "",
  },
  {
    type: "email",
    label: "Email",
    name: "email",
    isRequired: true,
    message: "",
  },
  {
    type: "password",
    label: "Password",
    name: "password",
    placeholder: "",
    isRequired: true,
    message: "",
  },
];

export default function SignUpForm() {
  const [inputState, setInputState] = useState(inputs);

  const [formState, setFormState] = useState({
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    password: null,
  });

  const user_id = generateId("user");
  const createdOn = new Date();
  const updatedOn = new Date();

  function handleSubmit(e) {
    e.preventDefault();
    let isValidForm = true;

    clearValidationMessages(inputState, setInputState);

    isValidForm = validateSignUpForm(
      inputState,
      setInputState,
      formState,
      usersModel
    );

    if (isValidForm) {
      createUser(formState);
      // usersModel.push({ ...formState, user_id, createdOn, updatedOn });
      //Add toast
      //Redirect to sign in page
    } else {
      console.log("Form is not valid");
      //Add toast
    }

    console.log(usersModel)
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
      </form>
    </FormProvider>
  );
}
