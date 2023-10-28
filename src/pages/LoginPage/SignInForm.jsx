import { useState } from "react";
import { Button, InputField } from "../../components";
import { FormProvider } from "../../components/Global/Form/FormContext";
import { usersModel } from "../../lib/constants";
import { validateSignInForm } from "../../lib/utils/validations";

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
      placeholder: "",
      isRequired: true,
      message: "",
    }
  ];

function updateLocalStorage(username){
    localStorage.setItem("username", username);
}


export default function SignInForm() {

    const [inputState, setInputState] = useState(inputs);
    const [formState, setFormState] = useState({
        username: null,
        password: null,
    });

    function handleSubmit(e) {
        e.preventDefault()
        let validUser = validateSignInForm(inputState, setInputState, formState, usersModel);

        if(validUser){
            updateLocalStorage(formState.username);
            //Load Dashboard
        }
    }

    function handleInputChange(name, value){
        setFormState({ ...formState, [name]: value });
    }

  return (
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
            <Button type={"submit"} text={"Sign In"}/>
            <Button type={"button"} text={"Cancel"} secondary/>
        </form>
    </FormProvider>
  )
}
