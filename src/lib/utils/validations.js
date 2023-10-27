export function clearValidationMessages(inputState, setInputState) {
    const updatedInputState = inputState.map((input) => ({
      ...input,
      message: "",
    }));
    setInputState(updatedInputState);
  }
  
export function validateSignUpForm(inputState, setInputState, formState, usersModel){

    let isValid = true;

    let updatedInputState = checkMissingValues(inputState, formState);

    updatedInputState = checkDuplicate(updatedInputState, formState, usersModel);

    setInputState(updatedInputState);

    isValid = updatedInputState.every((input) => input.message === "");

    return isValid;
}

function checkMissingValues(inputState, formState){
    const newInputState = inputState.map((input) => {
        if (!formState[input.name] && input.isRequired) {
            return { ...input, message: "This field is required" };
        } 
        
        return { ...input, message: "" };
    })

    return newInputState;

}
  
function checkDuplicate(inputState, formState, usersModel) {
  
    const newInputState = inputState.map((input) => {
      if (input.name === 'username' || input.name === 'email') {
        if (isDuplicate(input.name, formState, usersModel)) {
          return { ...input, message: `${input.name} already exists.` };
        } else {
          return { ...input, message: "" };
        }
      }
      return input;
    });

    return newInputState;
  
  }
  
  function isDuplicate(property, formState, usersModel) {
    const duplicateProperty = usersModel.find((user) => user[property] === formState[property]);
  
    return !!duplicateProperty;
  }
  