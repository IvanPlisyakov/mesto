import {Popup} from './Popup.js';
export class Card {
  constructor( data, templateSelectorItem, handleCardClick) {
    this._elTtl = data.name;
    this._elImg = data.link;

    
    this._elementCopy = document.querySelector(templateSelectorItem).content.cloneNode(true);
    this._elementImage = this._elementCopy.querySelector('.element__image');

    this._element = this._elementCopy.querySelector('.element');

    this._elementCopy.querySelector('.element__title').textContent = data.name;
    this._elementImage.setAttribute('src', data.link);

    this.handleCardClick = handleCardClick;

    this._btnLike = this._elementCopy.querySelector('.element__btn-like');
  }

  _setEventListeners() {
    this._elementImage.addEventListener('click', () => { //открытие карточки
      this.handleCardClick(this._elTtl, this._elImg);
    });

    this._elementCopy.querySelector('.element__btn-like').addEventListener('click', () => {  //// inst: vanishhhhhhhhh проверьте, пожалуйста, работают ли там лайки тоже
      this._toggleBtnLike()
    });

    this._elementCopy.querySelector('.element__btn-delete').addEventListener('click', () => {// удаление карточки 
      this._removeImageClick()
    });
  }

  _toggleBtnLike() {
    this._btnLike.classList.toggle('element__btn-like_active');
  }

  _removeImageClick() {
    this._element.remove();
    this._elementCopy = null;
  }
  
  initializationElement() {
    this._setEventListeners();
    return this._elementCopy;
    
  }
}