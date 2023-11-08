import { useState } from "react";
import {
  Button,
  Modal,
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

export default function CreateUserForm({
  usersData,
  setShowModal,
  setShowToast,
  setMessage,
}) {
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
      createUser(formState);

      setShowToast(true);
      setShowModal(false);
      setMessage("User successfully created");
    } else {
      console.log("Form is not valid");
    }
  }

  function handleCancel() {
    setShowModal(false);
  }

  function handleInputChange(name, value) {
    setFormState({ ...formState, [name]: value });
  }

  return (
    <>
      <Modal title={"Create User"} setShowModal={setShowModal}>
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
      </Modal>
    </>
  );
}
