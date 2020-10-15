export class Api {
  constructor(rendererItems, data, dataProfile, addNewItem, userId) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;
    //console.log(this._headers)

    this._userName = dataProfile.userName;
    this._userInfo = dataProfile.userInfo;
    this._avatarImage = dataProfile.avatarImage;

    //this._elementsList = elementsList;
    this._rendererItems = rendererItems;

    this._addNewItem = addNewItem;

    this._userId = userId;
  }

  getInitialCards() {
    fetch(`${this._baseUrl}/cards`, {//карточки
      method: 'GET',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) =>{
        data = data.reverse();
        this._rendererItems(data)

        //console.log(data)
      })
      .catch((err) => {
        console.log(err); 
      });
  }
  
  getInitialProfile() {
    //this._renderLoading('True', '.form_new-avatar')
    fetch(`${this._baseUrl}/users/me`, {//данный профиля
      method: 'GET',
      headers: this._headers,
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((data) =>{
        this._userName.textContent = data.name;
        this._userInfo.textContent = data.about;
        this._avatarImage.src = data.avatar;
      })
      .catch((err) => {
        console.log(err); 
      });
      //.finally(() => {
      //  this._renderLoading(False, '.form_new-avatar')
      //});
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
      .then(() => {
        if (res.ok) {
          return res.json();
       }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        this._renderLoading(false, '.form_edit-button')
      });
  }

  addCard(elementsList, name, link) {
    this._renderLoading(true, '.form_add-button')
    fetch(`${this._baseUrl}/cards`, {//делаем запрос, что мы добавили новую карточку
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(() => {
        fetch(`${this._baseUrl}/cards`, {//после загрузки карточки, получаем данные о всех карточках
          method: 'GET',
          headers: this._headers
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }

            return Promise.reject(`Ошибка: ${res.status}`);
          })
          .then((data) =>{
            for(let i = 0; i <= data.length; i++) {//находим карточку которую загрузили, чтобы взять её id
              if(data[i].name == name && data[i].link == link && data[i].owner._id == this._userId) {
                //elementsList.addItem(createNewCard({name, link, likes: [], _id: data[i]._id ,owner: {_id: data[i].owner._id}}));
                this._addNewItem(elementsList, {name, link, likes: [], _id: data[i]._id, owner: {_id: data[i].owner._id}})//добавляем карточку в вёрстку с нашими данными и данными сервера
                //const r =  {id: data[i]._id, ownerId: data[i].owner._id}
                //return data[i]._id
                break
              }
            }
          })
          .catch((err) => {
            console.log(err); 
          })
      })
      .catch((err) => {
        console.log(err); 
      })
      .finally(() => {
        this._renderLoading(false, '.form_add-button')
      });
  }
  addLikeItem(idItem) {
    fetch(`${this._baseUrl}/cards/likes/${idItem}`, {
      method: 'PUT',
      headers: this._headers
    })
  }

  removeLikeItem(idItem) {
    fetch(`${this._baseUrl}/cards/likes/${idItem}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  deleteItem(idItem) {
    fetch(`${this._baseUrl}/cards/${idItem}`, {
      method: 'DELETE',
      headers: this._headers
    })
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

