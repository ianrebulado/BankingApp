import usersModel from "../constants/usersModel.json";

export function createUser() {}

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
  
