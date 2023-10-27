import { useState } from "react";
import Button from "../../components/Global/Button/Button";
import Modal from "../../components/Global/Modal/Modal";
import { FormProvider } from "../../components/Global/Form/FormContext";
import InputField from "../../components/Global/InputField/InputField";
import usersModel from "../../lib/constants/usersModel";
import generateId from "../../lib/utils/generateId";
import { clearValidationMessages, validateSignUpForm } from "../../lib/utils/validations";

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
  }
];

function updateLocalStorage(username){
    localStorage.setItem("username", username);
}


export default function CreateUserForm() {

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

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValidForm = true;

    clearValidationMessages(inputState, setInputState);

    isValidForm = validateSignUpForm(inputState, setInputState, formState, usersModel);


    if (isValidForm) {
        updateLocalStorage(formState.username);
        usersModel.push({ ...formState, user_id, createdOn, updatedOn });
        console.log("Users", usersModel);
      } else {
        console.log('Form is not valid');
      }
  };

  const handleInputChange = (name, value) => {
    setFormState({ ...formState, [name]: value });
  };
    
  return (
    <Modal title={"Create User"}>
      <div>Hello</div>
      <FormProvider formValues={formState} handleInputChange={handleInputChange}>
        <form onSubmit={handleSubmit}>
            {inputState.map(({type, label, name, placeholder, message}, index) => (
              <InputField
                key={index}
                type={type}
                label={label}
                name={name}
                placeholder={placeholder}
                message={message}
              />
            ))}
            <Button type={"submit"} text={"Create User"}/>
            <Button type={"button"} text={"Cancel"} secondary/>
        </form>
      </FormProvider>
    </Modal>
  );
}
