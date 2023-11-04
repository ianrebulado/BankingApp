export const createUserFormInputs = [
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
  },
];

export const initialCreateUserFormState = [
  {
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    password: null,
  },
];
