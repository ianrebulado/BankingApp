import usersModel from "../constants/usersModel.json";
import generateId from "./generateId";
import { updateLocalStorage } from "../../pages/LoginPage/SignInForm";

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
  
  export function initialUsers() {
    localStorage.setItem ('users', JSON.stringify(usersModel))
  }
  

  export function userSignedIn(username, password) {
    
    const user = usersModel.find((u) => u.username === username && u.password === password);
  
    if (user) {
      console.log('Signed In User:', user);
      updateLocalStorage('SignedInUser', JSON.stringify(user));
      } else {
      localStorage.removeItem('SignedInUser')
    }
    
    return user
  }