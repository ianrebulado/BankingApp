import { getBalance } from "./transactions";
import { filterUsersByName, filterUsersByUsername } from "./users";
import Validator from "./validator";
import { usersModel } from "../constants";

export function clearValidationMessages(inputState, setInputState) {
  const updatedInputState = inputState.map((input) => ({
    ...input,
    message: "",
  }));
  setInputState(updatedInputState);
}

export function validateSignUpForm(
  inputState,
  setInputState,
  formState,
  usersData
) {
  let isValid = true;

  let updatedInputState = checkMissingValues(inputState, formState);

  updatedInputState = checkDuplicate(updatedInputState, formState, usersData);

  setInputState(updatedInputState);

  isValid = checkValidForm(updatedInputState);

  return isValid;
}

export function validateSignInForm(
  inputState,
  setInputState,
  formState,
  usersData
) {
  let isValid = true;

  const user = matchUserCredentials(formState, usersData);

  let updatedInputState = checkCredentials(inputState, user);
  setInputState(updatedInputState);

  isValid = checkValidForm(updatedInputState);

  return isValid;
}

export function validateExpenseForm(inputState, setInputState, formState) {
  const updatedInputState = checkMissingValues(inputState, formState);
  setInputState(updatedInputState);

  const isValid = checkValidForm(updatedInputState);
  return isValid;
}

function checkMissingValues(inputState, formState) {
  const newInputState = inputState.map((input) => {
    if (!formState[input.name] && input.isRequired) {
      return { ...input, message: "This field is required" };
    }

    return { ...input, message: "" };
  });

  return newInputState;
}

function checkDuplicate(inputState, formState, usersData) {
  const newInputState = inputState.map((input) => {
    if (input.name === "username" || input.name === "email") {
      if (isDuplicate(input.name, formState, usersData)) {
        return { ...input, message: `${input.name} already exists.` };
      } else {
        return { ...input, message: "" };
      }
    }
    return input;
  });

  return newInputState;
}

function isDuplicate(property, formState, usersData) {
  const duplicateProperty = usersData.find(
    (user) => user[property] === formState[property]
  );

  return !!duplicateProperty;
}

function matchUserCredentials({ username = null, password = null }, users) {
  const user = {
    username: null,
    errorType: null,
  };

  let matchedUser = users.find((user) => user.username === username);

  if (!matchedUser) {
    user.errorType = "user";
  } else if (matchedUser.signed_in) {
    user.errorType = "sign-in";
  } else if (matchedUser.password !== password) {
    user.errorType = "password";
  }

  return user;
}

function checkCredentials(inputState, userCredentials) {
  const newInputState = inputState.map((input) => {
    if (input.name === "username" && userCredentials.errorType === "user") {
      return { ...input, message: `Username not found.` };
    } else if (
      input.name === "password" &&
      userCredentials.errorType === "password"
    ) {
      return { ...input, message: `Wrong password detected` };
    }
    return { ...input, message: "" };
  });

  return newInputState;
}

function checkValidForm(inputState) {
  return inputState.every((input) => input.message === "" || !input.message);
}

export function validateTransactionForm(
  inputState,
  setInputState,
  formState,
  usersData
) {
  let updatedInputState = inputState.map((input) => {
    if (input.name === "username") {
      input.value = formState.username;
      return {
        ...input,
        message: Validator.for(input).isRequired().userExists(usersData)
          .errorMessage,
      };
    } else if (input.name === "amount") {
      if (formState.type === "deposit") {
        input.value = formState.amount;
        return {
          ...input,
          message: Validator.for(input).isRequired().greater(500).errorMessage,
        };
      } else if (formState.type === "withdraw") {
        let userId = filterUsersByUsername(formState.username).user_id;
        let balance = getBalance(userId);

        if (!balance) return;

        input.value = formState.amount;
        return {
          ...input,
          message: Validator.for(input)
            .isRequired()
            .greater(500)
            .isValidWithdrawalAmount(balance).errorMessage,
        };
      }
    }
  });

  setInputState(updatedInputState);

  return checkValidForm(updatedInputState);
}

export function validateTransferForm(
  inputState,
  setInputState,
  formState,
  usersData
) {
  let updatedInputState = inputState.map((input) => {
    if (input.name === "sendingUsername") {
      input.value = formState.sendingUsername;
      return {
        ...input,
        message: Validator.for(input)
          .isRequired()
          .isEqualTo(formState.receivingUsername)
          .userExists(usersData).errorMessage,
      };
    } else if (input.name === "receivingUsername") {
      input.value = formState.receivingUsername;
      return {
        ...input,
        message: Validator.for(input)
          .isRequired()
          .isEqualTo(formState.sendingUsername)
          .userExists(usersData).errorMessage,
      };
    } else if (input.name === "amount") {
      const sender = filterUsersByName(formState.sendingUsername);
      let sendingUserId = sender.user_id;
      let balance = getBalance(sendingUserId);

      input.value = formState.amount;
      return {
        ...input,
        message: Validator.for(input)
          .isRequired()
          .greater(500)
          .isValidWithdrawalAmount(balance).errorMessage,
      };
    }
  });

  setInputState(updatedInputState);

  return checkValidForm(updatedInputState);
}
