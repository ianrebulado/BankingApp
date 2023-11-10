import { getBalance } from "./transactions";
import { filterUsersByName, filterUsersByUsername } from "./users";
import Validator from "./validator";

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
  let updatedInputState = inputState.map((input) => {
    if (input.name === "username") {
      input.value = formState.username;
      return {
        ...input,
        message: Validator.for(input)
          .isRequired()
          .isString()
          .min(3)
          .max(50)
          .isUnique(usersData).errorMessage,
      };
    } else if (input.name === "email") {
      input.value = formState.email;
      return {
        ...input,
        message: Validator.for(input)
          .isRequired()
          .max(50)
          .isEmail()
          .isUnique(usersData).errorMessage,
      };
    } else if (input.name === "password") {
      input.value = formState.password;
      return {
        ...input,
        message: Validator.for(input)
          .isRequired()
          .min(8)
          .max(50)
          .hasCap()
          .hasNumber()
          .hasSpecial().errorMessage,
      };
    }

    return { ...input };
  });

  setInputState(updatedInputState);

  return checkValidForm(updatedInputState);
}

export function validateSignInForm(
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
    } else if (input.name === "password") {
      input.value = formState.password;
      return {
        ...input,
        message: Validator.for(input)
          .isRequired()
          .isValidCredentials(usersData, "username", formState.username)
          .errorMessage,
      };
    }
  });

  setInputState(updatedInputState);

  return checkValidForm(updatedInputState);
}

export function validateExpenseForm(inputState, setInputState, formState) {

  const updatedInputState = inputState.map((input) => {
    if(input.name === "description"){
      input.value = formState.description;
      return {
        ...input,
        message: Validator.for(input)
        .isRequired().errorMessage
      }
    } else if(input.name === "amount"){
      input.value = formState.amount;
      return {
        ...input,
        message: Validator.for(input)
        .isRequired()
        .greater(500).errorMessage
      }
    }
  })

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
        let user = filterUsersByUsername(formState.username);

        if (!user) return { ...input, message: "Could not find user" };

        let balance = getBalance(user.user_id);

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
          .usernameExists(usersData).errorMessage,
      };
    } else if (input.name === "receivingUsername") {
      input.value = formState.receivingUsername;
      return {
        ...input,
        message: Validator.for(input)
          .isRequired()
          .isEqualTo(formState.sendingUsername)
          .usernameExists(usersData).errorMessage,
      };
    } else if (input.name === "amount") {
      const sender = filterUsersByName(formState.sendingUsername);

      if (!sender) return { ...input, message: "Could not find user" };
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
