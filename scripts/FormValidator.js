export class FormValidator {
  constructor(tuningValidation, formElement) {
    this._tuningValidation = tuningValidation;
    this._formElement = formElement;

    this._inputList = Array.from(formElement.querySelectorAll(tuningValidation['formInput']));
    this._buttonElement = formElement.querySelector(tuningValidation['formSubmit']);
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._tuningValidation['inputTypeError']);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._tuningValidation['inputErrorActive']);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._tuningValidation['inputTypeError']);
    errorElement.classList.remove(this._tuningValidation['inputErrorActive']);
    errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    if(this._hasInvalidInput()){
      this._buttonElement.classList.add(this._tuningValidation['buttonInctive']);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._tuningValidation['buttonInctive']);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
