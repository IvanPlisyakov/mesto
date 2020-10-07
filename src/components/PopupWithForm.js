import {Popup} from '../components/Popup.js';
export class PopupWithForm extends Popup {
  constructor(formSubmit, popupSelector) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    
    this._inputList = this._popup.querySelectorAll('.profile-form__user');
    this._buttonSubmit = this._popup.querySelector('.profile-form__btn-save');
  }

  _getInputValues() {//собирает данные всех полей формы
    this.formData = {}

    this._inputList.forEach((item) => {
      this.formData[item.id] = item.value;
    })
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
    
    const arrayValues = Object.values({name, info})


    this._inputList.forEach((item, i) => {
      item.value = arrayValues[i];
      i++;
    })
  }

  close() {
    super.close();

    /*сброс формы*/
    this._inputList.forEach((item) => {
      item.value = "";
    });

  }
}