export class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
  }

  _sendStandartThen(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _sendStandartCatch(err) {
    console.log(err); 
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {//карточки
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => {return this._sendStandartThen(res);})
      .catch((err) => {this._sendStandartCatch(err)});
  }
  
  getInitialProfile() {
    return fetch(`${this._baseUrl}/users/me`, {//данный профиля
      method: 'GET',
      headers: this._headers,
    })
      .then((res) => {return this._sendStandartThen(res);})
      .catch((err) => {this._sendStandartCatch(err)});
  }

  changeProfile(nameInput, infoInput) {
    this._renderLoading(true, '.form_edit-button')
    fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: nameInput,
        about: infoInput
      })
    }) 
      .then((res) => {return this._sendStandartThen(res);})
      .catch((err) => {this._sendStandartCatch(err)})
      .finally(() => {
        this._renderLoading(false, '.form_edit-button')
      });
  }

  addCard( name, link) {
    this._renderLoading(true, '.form_add-button')
    return fetch(`${this._baseUrl}/cards`, {//делаем запрос, что мы добавили новую карточку
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => {
        if (res.ok) {
          return this.getInitialCards();//res.json();
       }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {this._sendStandartCatch(err)})
      .finally(() => {
        this._renderLoading(false, '.form_add-button')
      });
  }


  addLikeItem(idItem) {
    fetch(`${this._baseUrl}/cards/likes/${idItem}`, {
      method: 'PUT',
      headers: this._headers
    })
      .catch((err) => {
        console.log(err); 
      })
  }

  removeLikeItem(idItem) {
    fetch(`${this._baseUrl}/cards/likes/${idItem}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .catch((err) => {this._sendStandartCatch(err)})
  }

  deleteItem(idItem) {
    fetch(`${this._baseUrl}/cards/${idItem}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .catch((err) => {this._sendStandartCatch(err)})
  }

  changeAvatarProfile(link) {
    this._renderLoading(true, '.form_new-avatar')
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .catch((err) => {this._sendStandartCatch(err)}) 
      .finally(() => {
        this._renderLoading(false, '.form_new-avatar')
      });
  }

  _renderLoading(isLoading, popupSelector) {
    if(isLoading) {
      document.querySelector(popupSelector).querySelector('.profile-form__btn-save').textContent = "Сохранение..."
    } else {
      document.querySelector(popupSelector).querySelector('.profile-form__btn-save').textContent = "Сохранить"
    }
  }
}

