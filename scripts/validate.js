const showInputError = (formElement, inputElement, errorMessage, tuningValidation) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(tuningValidation['inputTypeError']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(tuningValidation['inputErrorActive']);
};

const hideInputError = (formElement, inputElement, tuningValidation) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(tuningValidation['inputTypeError']);
  errorElement.classList.remove(tuningValidation['inputErrorActive']);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, tuningValidation) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, tuningValidation);
  } else {
    hideInputError(formElement, inputElement, tuningValidation);
  }
};

const setEventListeners = (formElement, tuningValidation) => {
  const inputList = Array.from(formElement.querySelectorAll(tuningValidation['formInput']));
  const buttonElement = formElement.querySelector(tuningValidation['formSubmit']);
  toggleButtonState(inputList, buttonElement, tuningValidation);
  
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, tuningValidation);
      toggleButtonState(inputList, buttonElement, tuningValidation);
    });
  });
};

const enableValidation = (tuningValidation) => {
  const formList = Array.from(document.querySelectorAll(tuningValidation['form']));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, tuningValidation);
    
    /*const fieldsetList = Array.from(formElement.querySelectorAll('.form__set'));

    fieldsetList.forEach((fieldSet) => {
      setEventListeners(fieldSet);
    });*/
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, tuningValidation){
  if(hasInvalidInput(inputList)){
    buttonElement.classList.add(tuningValidation['buttonInctive']);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(tuningValidation['buttonInctive']);
    buttonElement.removeAttribute('disabled');
  }
}

const tuningValidation = {
  form: '.profile-form',
  inputTypeError: 'profile-form__user_type_error',
  inputErrorActive: 'profile-form__user-error_active',
  formInput: '.profile-form__user',
  formSubmit: '.profile-form__btn-save',
  buttonInctive: 'profile-form__btn-save_inactive',
};

enableValidation(tuningValidation);