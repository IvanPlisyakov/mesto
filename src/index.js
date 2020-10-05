import './pages/index.css';
import {Card} from './components/Card.js';
import {FormValidator} from './components/FormValidator.js';
import {Section} from './components/Section.js';
import {Popup} from './components/Popup.js';
import {PopupWithImage} from './components/PopupWithImage.js';
import {PopupWithForm} from './components/PopupWithForm.js';
import {UserInfo} from './components/UserInfo.js';
import {
  initialCards,
  tuningValidation,
  formEditButton,
  formAddButton,
  editButton,
  addButton
} from './utils/constants.js';







const PopupImage = new PopupWithImage(".picture-opening")

function handleCardClick(title, img) {
  PopupImage.open({name: title, link: img})
  PopupImage.setEventListeners();
}

function createNewCard(item) {
  return new Card(item,'#card', handleCardClick);
}

const ElementsList = new Section({items: initialCards, renderer: createNewCard}, '.elements');
ElementsList.initializationItems();



const User = new UserInfo({name: ".profile__user-name", info: ".profile__user-info"});

const EditForm = new PopupWithForm(() => {
  User.setUserInfo(EditForm.formData)
}, ".form_edit-button")
EditForm.setEventListeners();
const validatorEditForm = new FormValidator(tuningValidation, formEditButton);
validatorEditForm.enableValidation();

editButton.addEventListener('click', () => {
  EditForm.open( User.getUserInfo() )

  validatorEditForm.inputList.forEach((inputElement) => {//снимаем предыдушие error
    validatorEditForm.hideInputError(inputElement);
  });
  validatorEditForm.buttonElement.classList.remove(validatorEditForm.tuningValidation['buttonInctive']);//чтобы кнопка была активна при открытии попапа
  validatorEditForm.buttonElement.removeAttribute('disabled');
});



const AddForm = new PopupWithForm(() => {
  const item = [{
    name: AddForm.formData[0],
    link: AddForm.formData[1],
  }]
  const ElementList = new Section({items: item, renderer: createNewCard}, '.elements');
  ElementList.initializationItems();
}, ".form_add-button");
AddForm.setEventListeners();
const validatorAddForm = new FormValidator(tuningValidation, formAddButton);
validatorAddForm.enableValidation();

addButton.addEventListener('click', () => {
  AddForm.open( {} );
  validatorAddForm.inputList.forEach((inputElement) => {
    validatorAddForm.hideInputError(inputElement);
  });
});







