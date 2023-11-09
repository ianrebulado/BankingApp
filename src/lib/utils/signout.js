import { updateLocalStorage } from "../../pages/LoginPage/Forms/SignInForm"

export function signout() {

    updateLocalStorage('signedIn', false);
    localStorage.removeItem('SignedInUser');
    localStorage.removeItem('username');        
}