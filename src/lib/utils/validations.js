import { fetchUsers } from "./users";
const usersData = fetchUsers();

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
  users = usersData
) {
  let isValid = true;

  let updatedInputState = checkMissingValues(inputState, formState);

  updatedInputState = checkDuplicate(updatedInputState, formState, users);

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

function matchUserCredentials({ username, password }, users) {
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
  return inputState.every((input) => input.message === "");
}

export function validateDepositForm() {}
