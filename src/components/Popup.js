export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_opened");
  }
  
  close() {
    this._popup.classList.remove("popup_opened");
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
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    document.addEventListener('click', this._handleClickClose.bind(this));
  }

}