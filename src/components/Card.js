export class Card {
  constructor( data, templateSelectorItem, handleCardClick, deleteImagePopup, apiClass) {
    this._elTtl = data.name;
    this._elImg = data.link;
    this._deleteImagePopup = deleteImagePopup;

    
    this._elementCopy = document.querySelector(templateSelectorItem).content.cloneNode(true);
    this._elementImage = this._elementCopy.querySelector('.element__image');

    this._element = this._elementCopy.querySelector('.element');

    this._data = data;
    //console.log(this._data.likes)
    this._btnLike = this._elementCopy.querySelector('.element__btn-like')

    this._numberLike = this._elementCopy.querySelector('.element__number-like')
    this._numberLike.textContent = data.likes.length;

    this._addLikeItemApi = apiClass.addLikeItem;
    this._removeLikeItemApi = apiClass.removeLikeItem;
    this._deleteItemApi = apiClass.deleteItem;
    
    for(let i = 0; i < this._data.likes.length; i++) {
      if(this._data.likes[i]._id == 'd031d4975e470bf308783176') {
        this._btnLike.classList.add('element__btn-like_active');
      }
    }
    



    this._elementCopy.querySelector('.element__title').textContent = data.name;
    this._elementImage.setAttribute('src', data.link);

    this.handleCardClick = handleCardClick;

  

    if(data.owner._id == 'd031d4975e470bf308783176') {
      this._elementCopy.querySelector('.element__btn-delete').classList.remove('element__btn-delete_inactive')
    }
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
    if (this._btnLike.classList.value.indexOf('element__btn-like_active') > -1) {
      this._btnLike.classList.remove('element__btn-like_active');

      this._removeLikeItemApi(this._data._id);

      this._numberLike.textContent = Number(this._numberLike.textContent) - 1;
    } else {
      this._btnLike.classList.add('element__btn-like_active');

      this._addLikeItemApi(this._data._id);

      this._numberLike.textContent = Number(this._numberLike.textContent) + 1;
    }
  }

  _removeImageClick() {
    this._deleteImagePopup.open({});
    
    this._deleteImagePopup._popup.addEventListener('submit', () => {
      this._element.remove();
      this._elementCopy = null;

      this._deleteItemApi(this._data._id);
    })
  }
  
  initializationElement() {
    this._setEventListeners();
    //console.log(this._datalikes)
    return this._elementCopy;
    
  }
}