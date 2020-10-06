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







const popupImage = new PopupWithImage(".picture-opening")
popupImage.setEventListeners();
function handleCardClick(title, img) {
  popupImage.open({name: title, link: img})
}

function createNewCard(item) {
  const card = new Card(item,'#card', handleCardClick);
  return card.initializationElement()
}

const elementsList = new Section({items: initialCards, renderer: createNewCard}, '.elements');
elementsList.renderItems();



const user = new UserInfo({name: ".profile__user-name", info: ".profile__user-info"});

const editForm = new PopupWithForm(() => {
  user.setUserInfo(EditForm.formData)
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
  
 // createNewCard({name, link});

  //const elementList = new Section({items: item, renderer: createNewCard}, '.elements');
  elementsList.addItem(createNewCard({name, link}));
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









