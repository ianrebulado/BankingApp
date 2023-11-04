export default class Validator {
  constructor({ label = "This", name, value }) {
    this.label = label;
    this.name = name;
    this.value = value;
    this.errorMessage = null;
  }

  _checkError() {
    if (this.errorMessage) return true;
    return false;
  }

  isRequired(errorMessage = `${this.label} is required`) {
    if (this._checkError()) return this;

    if (!this.value || this.value.trim() === "") {
      this.errorMessage = errorMessage;
    }
    return this;
  }

  isString(errorMessage = `${this.label} must be a string`) {
    if (this._checkError()) return this;

    if (typeof this.value !== "string") {
      this.errorMessage = errorMessage;
    }
    return this;
  }

  isNumber(errorMessage = `${this.label} must be a number`) {
    if (this._checkError()) return this;

    if (typeof this.value !== "number") {
      this.errorMessage = errorMessage;
    }

    return this;
  }

  min(
    length,
    errorMessage = `${this.label} must be at least ${length} characters long`
  ) {
    if (this._checkError()) return this;

    if (this.value.length < length) {
      this.errorMessage = errorMessage;
    }
    return this;
  }

  max(
    length,
    errorMessage = `${this.label} must be at most ${length} characters long`
  ) {
    if (this._checkError()) return this;

    if (this.value.length > length) {
      this.errorMessage = errorMessage;
    }
    return this;
  }

  lesser(amount, errorMessage = `${this.label} must be lesser than ${amount}`) {
    if (this._checkError()) return this;

    if (this.value > amount) {
      this.errorMessage = errorMessage;
    }

    return this;
  }

  greater(
    amount,
    errorMessage = `${this.label} must be greater than ${amount}`
  ) {
    if (this._checkError()) return this;

    if (this.value < amount) {
      this.errorMessage = errorMessage;
    }

    return this;
  }

  isValidWithdrawalAmount(
    userBalance,
    errorMessage = `Balance is insufficient`
  ) {
    if (this._checkError()) return this;
    const withdrawResult = userBalance - this.value;

    if (withdrawResult <= 0) {
      this.errorMessage = errorMessage;
    }

    return this;
  }

  isEmail(errorMessage = `${this.label} must be a valid email`) {
    if (this._checkError()) return this;

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailRegex.test(this.value)) {
      this.errorMessage = errorMessage;
    }
    return this;
  }

  isUnique(users, errorMessage = `${this.label} already exists`) {
    if (this._checkError()) return this;

    if (users.some((user) => user[this.name] === this.value)) {
      this.errorMessage = errorMessage;
    }

    return this;
  }

  emailExists(users, errorMessage = `${this.label} not found`) {
    if (this._checkError()) return this;

    if (!users.some((user) => user[this.name] === this.value)) {
      this.errorMessage = errorMessage;
    }

    return this;
  }

  userExists(users, errorMessage = `${this.label} not found`) {
    if (this._checkError()) return this;

    if (!users.some((user) => user[this.name] === this.value)) {
      this.errorMessage = errorMessage;
    }

    return this;
  }

  hasCap(errorMessage = `${this.label} must contain a capital letter`) {
    if (this._checkError()) return this;

    const capitalLetterRegex = /[A-Z]/;
    if (!capitalLetterRegex.test(this.value)) {
      this.errorMessage = errorMessage;
    }

    return this;
  }

  hasNumber(errorMessage = `${this.label} must contain a number`) {
    if (this._checkError()) return this;

    const numberRegex = /\d/;
    if (!numberRegex.test(this.value)) {
      this.errorMessage = errorMessage;
    }

    return this;
  }

  hasSpecial(errorMessage = `${this.label} must contain a special character`) {
    if (this._checkError()) return this;

    const specialCharacterRegex = /[!@#$%^&*()_+[\]{};':"\\|,.<>?`~]/;
    if (!specialCharacterRegex.test(this.value)) {
      this.errorMessage = errorMessage;
    }

    return this;
  }

  isValidCredentials(users, email, errorMessage = "Password is incorrect") {
    if (this._checkError()) return this;

    const user = users.find((user) => user.email === email);

    if (user && user.password !== this.value) {
      this.errorMessage = errorMessage;
    }

    return this;
  }

  static for({ label, name, value }) {
    return new Validator({ label, name, value });
  }
}
