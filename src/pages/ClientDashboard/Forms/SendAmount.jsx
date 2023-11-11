import { useState } from "react";
import {
  initialTransferFormState,
  transferFormInputs,
} from "../../../lib/constants/globals";
import { FormProvider, InputField, Button } from "../../../components";
import {
  validateTransferForm,
  clearValidationMessages,
} from "../../../lib/utils/validations";
import {
  filterUsersById,
  filterUsersByName,
  filterUsersByUsername,
} from "../../../lib/utils/users";
import { getTransactions, send } from "../../../lib/utils/transactions";

function SendAmount({
  userId,
  usersData,
  setShowModal,
  setShowToast,
  updateTransactions,
}) {
  const sendingUsername = filterUsersById(userId);
  const [inputState, setInputState] = useState(transferFormInputs);
  const [formState, setFormState] = useState(initialTransferFormState);

  const handleInputChange = (name, value) => {
    setFormState({
      ...formState,
      sendingUsername: sendingUsername.username,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    clearValidationMessages(inputState, setInputState);
    setInputState({ ...inputState, value: sendingUsername.username });

    let isValidForm = false;
    isValidForm = validateTransferForm(
      inputState,
      setInputState,
      { ...formState, type: "transfer" },
      usersData
    );

    if (isValidForm) {
      const senderId = filterUsersByUsername(
        formState.sendingUsername,
        usersData
      ).user_id;
      const receiverId = filterUsersByUsername(
        formState.receivingUsername,
        usersData
      ).user_id;

      const isTransferred = send(senderId, receiverId, formState.amount);

      if (isTransferred) {
        const updatedTransactions = getTransactions(senderId);
        updateTransactions(updatedTransactions);
        setShowToast(true);
        setShowModal(false);
      } else {
        console.log("Transfer Unsuccessful");
      }
    } else {
      console.log("Form not valid.");
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      <FormProvider
        formValues={formState}
        handleInputChange={handleInputChange}
      >
        <form onSubmit={handleSubmit}>
          {inputState.map(
            ({ type, label, name, placeholder, message }, index) => {
              return name !== "sendingUsername" ? (
                <InputField
                  key={index}
                  type={type}
                  label={label}
                  name={name}
                  placeholder={placeholder}
                  message={message}
                />
              ) : null;
            }
          )}
          <div className="buttons-container">
            <Button type={"submit"} text={"Transfer"} />
            <Button
              type={"button"}
              text={"Cancel"}
              handleClick={handleCancel}
              secondary
            />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default SendAmount;
