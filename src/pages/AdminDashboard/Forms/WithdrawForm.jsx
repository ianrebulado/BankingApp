import React, { useState } from "react";

import { Button, Modal, InputField, FormProvider } from "../../../components/";
import {
  withdrawFormInputs,
  initialWithdrawFormState,
} from "../../../lib/constants/globals";
import {
  clearValidationMessages,
  validateTransactionForm,
} from "../../../lib/utils/validations";
import { withdraw } from "../../../lib/utils/transactions";
import { filterUsersByName } from "../../../lib/utils/users";

export default function WithdrawForm({
  usersData,
  setShowModal,
  setShowToast,
  setMessage,
}) {
  const [inputState, setInputState] = useState(withdrawFormInputs);
  const [formState, setFormState] = useState(initialWithdrawFormState);

  function handleSubmit(e) {
    e.preventDefault();

    let isValidForm = true;

    clearValidationMessages(inputState, setInputState);

    isValidForm = validateTransactionForm(
      inputState,
      setInputState,
      { ...formState, type: "withdraw" },
      usersData
    );

    if (isValidForm) {
      const userId = filterUsersByName(formState.username).user_id;

      withdraw(userId, formState.amount);

      setShowToast(true);
      setShowModal(false);
      setMessage("Successful withdrawal made");
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
      <Modal title={"Make a Withdrawal"}>
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
            <Button type={"submit"} text={"Withdraw"} />
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
