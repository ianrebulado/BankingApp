export const CreateUserFormInputs = [
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

export const depositFormInputs = [
  {
    type: "text",
    label: "Username",
    name: "username",
    placeholder: "",
    isRequired: true,
    message: "",
  },
  {
    type: "number",
    label: "Amount to Deposit",
    name: "amount",
    placeholder: 0.0,
    isRequired: true,
    message: "",
  },
];

export const initialDepositFormState = {
  username: null,
  amount: 0,
};

export const withdrawFormInputs = [
  {
    type: "text",
    label: "Username",
    name: "username",
    placeholder: "",
    isRequired: true,
    message: "",
  },
  {
    type: "number",
    label: "Amount to Withdraw",
    name: "amount",
    placeholder: 0.0,
    isRequired: true,
    message: "",
  },
];

export const initialWithdrawFormState = {
  username: null,
  amount: 0,
};

export const transferFormInputs = [
  {
    type: "text",
    label: "Transfer from",
    name: "sendingUsername",
    placeholder: "",
    isRequired: true,
    message: "",
  },
  {
    type: "text",
    label: "Transfer to",
    name: "receivingUsername",
    placeholder: "",
    isRequired: true,
    message: "",
  },
  {
    type: "number",
    label: "Amount to Transfer",
    name: "amount",
    placeholder: 0.0,
    isRequired: true,
    message: "",
  },
];

export const initialTransferFormState = {
  sendingUsername: null,
  receivingUsername: null,
  amount: 0,
};
