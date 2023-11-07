import React, { useState } from "react";

import { Button, Modal, InputField, FormProvider } from "../../../components/";
import {
  transferFormInputs,
  initialTransferFormState,
} from "../../../lib/constants/globals";
import {
  clearValidationMessages,
  validateTransferForm,
} from "../../../lib/utils/validations";
import { deposit, withdraw } from "../../../lib/utils/transactions";
import { filterUsersByUsername } from "../../../lib/utils/users";

export default function TransferForm({
  usersData,
  setShowModal,
  setShowToast,
  setMessage,
}) {
  const [inputState, setInputState] = useState(transferFormInputs);
  const [formState, setFormState] = useState(initialTransferFormState);

  function handleSubmit(e) {
    e.preventDefault();

    let isValidForm = true;

    clearValidationMessages(inputState, setInputState);

    isValidForm = validateTransferForm(
      inputState,
      setInputState,
      { ...formState, type: "transfer" },
      usersData
    );

    if (isValidForm) {
      const sendingUserId = filterUsersByUsername(
        formState.sendingUsername
      ).user_id;

      const receivingUserId = filterUsersByUsername(
        formState.receivingUsername
      ).user_id;

      withdraw(sendingUserId, formState.amount);
      deposit(receivingUserId, formState.amount);

      setShowToast(true);
      setShowModal(false);
      setMessage("Successful transfer made");
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
      <Modal title={"Make a Tansfer"}>
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
            <Button type={"submit"} text={"Transfer"} />
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
