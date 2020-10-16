import './pages/index.css';
import {Api} from './components/Api.js';
import {Card} from './components/Card.js';
import {FormValidator} from './components/FormValidator.js';
import {Section} from './components/Section.js';
//import {Popup} from './components/Popup.js';
import {PopupWithImage} from './components/PopupWithImage.js';
import {PopupWithForm} from './components/PopupWithForm.js';
import {UserInfo} from './components/UserInfo.js';
import {
  userId,
  tuningValidation,
  formEditButton,
  formAddButton,
  formNewAvatar,
  editButton,
  addButton,
  newAvatarButton,
  userName,
  userInfo,
  avatarImage
} from './utils/constants.js';

let elementsList;

const api = new Api( {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: '12ba02f1-21d1-4be5-b67c-2a240b5b5b87',
    'Content-Type': 'application/json'
  }
}); 

const initialProfile = api.getInitialProfile()
initialProfile.then((data) => {
  userName.textContent = data.name;
  userInfo.textContent = data.about;
  avatarImage.src = data.avatar;
})

const initialCards = api.getInitialCards()
initialCards.then((data) => {
  elementsList = new Section({items: data.reverse(), renderer: createNewCard}, '.elements');
  elementsList.renderItems();
})





const popupDeleteImage = new PopupWithForm(() => {

},'.form_delete-popup');

popupDeleteImage.setEventListeners();

const popupImage = new PopupWithImage(".picture-opening")
popupImage.setEventListeners();

function handleCardClick(title, img) {
  popupImage.open({name: title, link: img})
}

function createNewCard(item) {
  const card = new Card(item,'#card', handleCardClick, popupDeleteImage, {
    deleteItem: (idItem) => {api.deleteItem(idItem)},
    removeLikeItem: (idItem) => {api.removeLikeItem(idItem)},
    addLikeItem: (idItem) => {api.addLikeItem(idItem)},
  });
  return card.initializationElement()
}

//const elementsList = new Section({items: Cards, renderer: createNewCard}, '.elements');
//elementsList.renderItems();



const user = new UserInfo({name: ".profile__user-name", info: ".profile__user-info"});

const editForm = new PopupWithForm(() => {
  user.setUserInfo(editForm.formData)

  api.changeProfile(editForm.formData['name-input'], editForm.formData['info-input']);
}, ".form_edit-button")
editForm.setEventListeners();
const validatorEditForm = new FormValidator(tuningValidation, formEditButton);
validatorEditForm.enableValidation();

editButton.addEventListener('click', () => {
  editForm.open( user.getUserInfo() )

  validatorEditForm.inputList.forEach((inputElement) => {//снимаем предыдушие error
    validatorEditForm.hideInputError(inputElement);
  });
  validatorEditForm.buttonElement.classList.remove(validatorEditForm.tuningValidation['buttonInctive']);//чтобы кнопка была активна при открытии попапа
  validatorEditForm.buttonElement.removeAttribute('disabled');
});



const addForm = new PopupWithForm(() => {

  const {
    'title-input': name,
    'link-input': link
  } = addForm.formData;
  const newCard = api.addCard( name, link)
  newCard.then((data) => {
    for(let i = 0; i <= data.length; i++) {//находим карточку которую загрузили, чтобы взять её id
      if(data[i].name == name && data[i].link == link && data[i].owner._id == userId) {
        elementsList.addItem(createNewCard(data[i]))
        break
      }
    }
  })
  //elementsList.addItem(createNewCard({name, link, likes: [], owner: {_id: 'd031d4975e470bf308783176'}}));
  //elementsList.addItem(createNewCard({name, link, likes: [], _id: ar.id , owner: {_id: ar.ownerId}}));


}, ".form_add-button");
addForm.setEventListeners();
const validatorAddForm = new FormValidator(tuningValidation, formAddButton);
validatorAddForm.enableValidation();

addButton.addEventListener('click', () => {
  addForm.open( {} );
  validatorAddForm.inputList.forEach((inputElement) => {
    validatorAddForm.hideInputError(inputElement);
  });

  validatorAddForm.buttonElement.classList.add(validatorAddForm.tuningValidation['buttonInctive']);
  validatorAddForm.buttonElement.setAttribute('disabled', true);
});


const newAvatarForm = new PopupWithForm(() => {
  avatarImage.src = newAvatarForm.formData['avatar-input']
  api.changeAvatarProfile(newAvatarForm.formData['avatar-input'])
}, '.form_new-avatar')
newAvatarForm.setEventListeners();
const validatornewAvatarForm = new FormValidator(tuningValidation, formNewAvatar);
validatornewAvatarForm.enableValidation();

newAvatarButton.addEventListener('click', () => {
  newAvatarForm.open( {} );
  validatornewAvatarForm.inputList.forEach((inputElement) => {
    validatornewAvatarForm.hideInputError(inputElement);
  });

  validatornewAvatarForm.buttonElement.classList.add(validatornewAvatarForm.tuningValidation['buttonInctive']);
  validatornewAvatarForm.buttonElement.setAttribute('disabled', true);
});














