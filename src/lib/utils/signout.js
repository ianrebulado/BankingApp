export function signout() {
  localStorage.setItem("signedIn", false);
  localStorage.removeItem("SignedInUser");
  localStorage.removeItem("username");
}
