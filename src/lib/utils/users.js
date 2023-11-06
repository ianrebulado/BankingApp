import usersModel from "../constants/usersModel";
import generateId from "./generateId";

const usersData = fetchUsers();

export function createUser(newUserForm) {
  const user_id = generateId("user");
  const createdOn = new Date();
  const updatedOn = new Date();

  usersData.push({
    ...newUserForm,
    user_id,
    createdOn,
    updatedOn,
  });

  storeUsers(usersData);
}

export function storeUsers(usersData) {
  localStorage.setItem("users", JSON.stringify(usersData));
}

export function fetchUsers() {
  const modelData = usersModel;

  const localStorageData = localStorage.getItem("users");

  return !localStorageData ? modelData : JSON.parse(localStorageData);
}

export function filterUsersById(userId) {
  const matchedUser = usersData.filter((user) =>
    user.user_id.toLowerCase().includes(userId.toLowerCase())
  );

  return matchedUser[0];
}

export function filterUsersByUsername(username) {
  const matchedUser = usersData.filter((user) =>
    user.username.toLowerCase().includes(username.toLowerCase())
  );

  return matchedUser[0];
}

export function filterUsersByName(name) {
  const matchedUser = usersData.filter(
    (user) =>
      user.first_name.toLowerCase().includes(name.toLowerCase()) ||
      user.last_name.toLowerCase().includes(name.toLowerCase())
  );

  console.log("matched: ", matchedUser[0]);

  return matchedUser[0];
}

export function getTotalUsers() {
  if (usersData) {
    return usersData.length;
  }
}
