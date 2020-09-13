export class Card {
  constructor(elementTitle, elementImg, templateSelector, pictureOpening, togglePopup) {
    this._elTtl = elementTitle;
    this._elImg = elementImg;

    this._elementCopy = document.querySelector(templateSelector).content.cloneNode(true);
    this._elementImage = this._elementCopy.querySelector('.element__image');

    this._elementCopy.querySelector('.element__title').textContent = elementTitle;
    this._elementImage.setAttribute('src', elementImg);

    this._pictureOpening = pictureOpening;

    this._togglePopup = togglePopup;
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => { //открытие карточки
      this._openImageClick();
    });

    this._elementCopy.querySelector('.element__btn-like').addEventListener('click', (evt) => {  //// inst: vanishhhhhhhhh проверьте, пожалуйста, работают ли там лайки тоже
      this._toggleBtnLike(evt)
    });

    this._elementCopy.querySelector('.element__btn-delete').addEventListener('click', (evt) => {// удаление карточки 
      this._removeImageClick(evt)
    });
  }

  _openImageClick() {
    this._pictureOpening.querySelector('.picture-opening__title').textContent = this._elTtl; // имя картинки
    this._pictureOpening.querySelector('.picture-opening__img').setAttribute('src', this._elImg);  //вставляем картинку

    this._togglePopup(this._pictureOpening);
  }

  _toggleBtnLike(evt) {
    evt.target.classList.toggle('element__btn-like_active');
  }

  _removeImageClick(evt) {
    evt.target.closest(".element").remove();
  }
  
  initializationElement() {
    this._setEventListeners();
    return this._elementCopy;
  }
}