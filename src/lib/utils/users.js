import usersModel from "../constants/usersModel.json";

const usersData = fetchUsers();

export function createUser(newUserForm) {
  const user_id = generateUserId("user");
  const createdOn = new Date();
  const updatedOn = new Date();

  return {
    ...newUserForm,
    user_id,
    createdOn,
    updatedOn,
  };
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

  return matchedUser[0];
}

export function initialUsers() {
  localStorage.setItem("users", JSON.stringify(usersModel));
}

export function getTotalUsers() {
  if (usersData) {
    return usersData.length;
  }
}

export function userSignedIn(username, password) {
  const users = fetchUsers();

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  return user;
}

export default function generateUserId(type) {
  let id = "";

  if (type === "user") {
    id = "u-" + Math.random().toString(36).substring(2, 12);
  } else {
    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString();
    const day = now.getDate().toString();
    const hours = now.getHours().toString();
    const minutes = now.getMinutes().toString();
    const seconds = now.getSeconds().toString();
    const milliseconds = now.getMilliseconds().toString();

    id = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  }

  return id;
}
