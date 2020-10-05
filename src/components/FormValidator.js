export class FormValidator {
  constructor(tuningValidation, formElement) {
    this.tuningValidation = tuningValidation;
    this._formElement = formElement;

    this.inputList = Array.from(formElement.querySelectorAll(tuningValidation['formInput']));
    this.buttonElement = formElement.querySelector(tuningValidation['formSubmit']);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this.tuningValidation['inputTypeError']);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.tuningValidation['inputErrorActive']);
  }

  hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this.tuningValidation['inputTypeError']);
    errorElement.classList.remove(this.tuningValidation['inputErrorActive']);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this.toggleButtonState();
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  toggleButtonState() {
    if(this._hasInvalidInput()){
      this.buttonElement.classList.add(this.tuningValidation['buttonInctive']);
      this.buttonElement.setAttribute('disabled', true);
    } else {
      this.buttonElement.classList.remove(this.tuningValidation['buttonInctive']);
      this.buttonElement.removeAttribute('disabled');
    }
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
