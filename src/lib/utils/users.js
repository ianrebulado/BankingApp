import usersModel from "../constants/usersModel";

export function createUser() {}

export function filterUsersByName(name) {
  const matchedUser = usersModel.filter(
    (user) =>
      user.first_name.toLowerCase().includes(name.toLowerCase()) ||
      user.last_name.toLowerCase().includes(name.toLowerCase())
  );

  return matchedUser[0];
}
