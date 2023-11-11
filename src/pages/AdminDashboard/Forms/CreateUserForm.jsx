import { useState } from "react";
import {
  Button,
  InputField,
  FormProvider,
  SelectInput,
} from "../../../components/";
import { createUser } from "../../../lib/utils/users";
import {
  createUserFormInputs,
  initialCreateUserFormState,
} from "../../../lib/constants/globals";
import {
  clearValidationMessages,
  validateSignUpForm,
} from "../../../lib/utils/validations";

export default function CreateUserForm({ usersHook, setAccountState }) {
  const [usersData, setUsersData] = usersHook;
  const [inputState, setInputState] = useState(createUserFormInputs);
  const [formState, setFormState] = useState(initialCreateUserFormState);

  function handleSubmit(e) {
    e.preventDefault();
    let isValidForm = false;

    clearValidationMessages(inputState, setInputState);

    isValidForm = validateSignUpForm(
      inputState,
      setInputState,
      formState,
      usersData
    );

    if (isValidForm) {
      usersData.push(createUser(formState));

      setUsersData([...usersData]);

      setAccountState((prevState) => ({
        ...prevState,
        showToast: true,
        showModal: false,
        isTransacting: true,
        toastMessage: "User successfully created",
      }));
    } else {
      console.log("Form is not valid");
    }
  }

  function handleCancel() {
    setAccountState((prevState) => ({ ...prevState, showModal: false }));
  }

  function handleInputChange(name, value) {
    setFormState({ ...formState, [name]: value });
  }

  return (
    <>
      <FormProvider
        formValues={formState}
        handleInputChange={handleInputChange}
      >
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
          <SelectInput
            label={"Select a role"}
            name={"role"}
            placeholder={"Select a role..."}
            options={[
              { value: "admin", label: "Admin" },
              { value: "client", label: "Client" },
            ]}
          />
          <Button type={"submit"} text={"Create User"} />
          <Button
            type={"button"}
            text={"Cancel"}
            handleClick={handleCancel}
            secondary
          />
        </form>
      </FormProvider>
    </>
  );
}
