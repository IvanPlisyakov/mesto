import {Popup} from '../components/Popup.js';
export class PopupWithForm extends Popup {
  constructor(formSubmit, popupSelector) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this.formData = {}
    this._inputList = this._popup.querySelectorAll('.profile-form__user');
    this._buttonSubmit = this._popup.querySelector('.profile-form__btn-save');

    this._form_user = this._popup.querySelector('.profile-form__user_data_name');
    this._form_info = this._popup.querySelector('.profile-form__user_data_info');
  }

  _getInputValues() {//собирает данные всех полей формы
    this.formData = {
      0: this._inputList[0].value,
      1: this._inputList[1].value,
    }
  }
  
  setEventListeners() {
    super.setEventListeners();
    /*добавлять обработчик сабмита формы (функция колбэк)*/
    this._popup.addEventListener('submit', (event) => {
      event.preventDefault();
      this._getInputValues();
      this._formSubmit();
      this.close();
    });
  }

  open({name = "", info = ""}) {
    super.open();

    this._form_user.value = name;
    this._form_info.value = info;
  }

  close() {
    super.close();

    /*сброс формы*/
    this._inputList.forEach((item) => {
      item.value = "";
    });

  }
}