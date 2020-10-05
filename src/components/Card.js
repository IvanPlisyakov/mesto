import {Popup} from './Popup.js';
export class Card {
  constructor( data, templateSelectorItem, handleCardClick) {
    this._elTtl = data.name;
    this._elImg = data.link;

    this._elementCopy = document.querySelector(templateSelectorItem).content.cloneNode(true);
    this._elementImage = this._elementCopy.querySelector('.element__image');

    this._elementCopy.querySelector('.element__title').textContent = data.name;
    this._elementImage.setAttribute('src', data.link);

    this.handleCardClick = handleCardClick;
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => { //открытие карточки
      this.handleCardClick(this._elTtl, this._elImg);
    });

    this._elementCopy.querySelector('.element__btn-like').addEventListener('click', (evt) => {  //// inst: vanishhhhhhhhh проверьте, пожалуйста, работают ли там лайки тоже
      this._toggleBtnLike(evt)
    });

    this._elementCopy.querySelector('.element__btn-delete').addEventListener('click', (evt) => {// удаление карточки 
      this._removeImageClick(evt)
    });
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