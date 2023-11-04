import usersModel from "../constants/usersModel";
import generateId from "./generateId";

export function createUser(newUserForm) {
  const user_id = generateId("user");
  const createdOn = new Date();
  const updatedOn = new Date();

  usersModel.push({
    ...newUserForm,
    user_id,
    createdOn,
    updatedOn,
  });

  storeUsers(usersModel);
}

export function storeUsers(usersData) {
  localStorage.setItem("users", JSON.stringify(usersData));
}

export function fetchUsers() {
  try {
    let usersData = localStorage.getItem("users");
    return JSON.parse(usersData);
  } catch (error) {
    console.log("Could not retrieve users: ", error);
  }
}

export function filterUsersByName(name) {
  const matchedUser = usersModel.filter(
    (user) =>
      user.first_name.toLowerCase().includes(name.toLowerCase()) ||
      user.last_name.toLowerCase().includes(name.toLowerCase())
  );

  return matchedUser[0];
}
