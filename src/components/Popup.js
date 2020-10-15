export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");

    document.addEventListener('keydown', this._handleEscClose.bind(this));
    document.addEventListener('click', this._handleClickClose.bind(this));
  }
  
  close() {
    this._popup.classList.remove("popup_opened");

    document.removeEventListener('keydown', this._handleEscClose.bind(this));
    document.removeEventListener('click', this._handleClickClose.bind(this));
  }

  _handleEscClose(evt) {
    if(evt.keyCode == 27){
      this.close();
    }
  }

  _handleClickClose(evt) {
    if(evt.target.classList.value.indexOf('popup') > -1){
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector(".profile-form__btn-close").addEventListener('click', this.close.bind(this));
    
  }

}