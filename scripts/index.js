import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const initialCards = [
  {
      name: 'LIL KRYSTALLL',
      link: 'images/element-lil_krystalll.png'
  },
  {
      name: 'ОПГ СИТИ',
      link: 'images/element-opg.jpg'
  },
  {
      name: 'Опиаты Круг',
      link: 'images/element-opiates.jpg'
  },
  {
      name: 'РНБ КЛУБ',
      link: 'images/element-rnb_club.jpg'
  },
  {
      name: 'Сладких снов',
      link: 'images/element-sweet_dreams.jpg'
  },
  {
      name: 'NO LABEL',
      link: 'images/element-no_label.jpg'
  }
];

const tuningValidation = {
  form: '.profile-form',
  inputTypeError: 'profile-form__user_type_error',
  inputErrorActive: 'profile-form__user-error_active',
  formInput: '.profile-form__user',
  formSubmit: '.profile-form__btn-save',
  buttonInctive: 'profile-form__btn-save_inactive',
};

const elements = document.querySelector('.elements');//секция для карточек

const pictureOpening = document.querySelector('.picture-opening');//секция открытой карточки  

//переменные связанные с попапами

const formEditButton = document.querySelector(".form_edit-button"); //формы
const formAddButton = document.querySelector(".form_add-button");

const editButton = document.querySelector(".profile__edit-button"); //создать форму  
const addButton = document.querySelector(".profile__add-button"); //создать форму

const inputName = formEditButton.querySelector(".profile-form__user_data_name"); //связываем поля 'edit' формы с соотв. переменными
const inputInfo = formEditButton.querySelector(".profile-form__user_data_info");

const inputTitle = formAddButton.querySelector(".profile-form__user_data_name"); //связываем поля 'add' формы с соотв. переменными
const inputLink = formAddButton.querySelector(".profile-form__user_data_info");

const userName = document.querySelector(".profile__user-name");  //связываем данные профиля с переменными
const userInfo = document.querySelector(".profile__user-info");

const btnClose = pictureOpening.querySelector('.profile-form__btn-close');


let openPopup;

                /*функции*/


function togglePopup(blockName){  /* хоть где-то popup правильно написал... */
  blockName.classList.toggle("popap-active");

  openPopup = blockName;

  if(blockName.classList.contains("popap-active")) {//смотрим активен ли попап
    document.addEventListener('keydown', handleEscClose);  //добавляем слушатель
    document.addEventListener('click', handleClickClose);
  } else {
    document.removeEventListener('keydown', handleEscClose); //удаляем
    document.removeEventListener('click', handleClickClose);
  }
}

function handleEscClose(evt) {//если нажат Esc, применяем togglePopup(blockName)
  if(evt.keyCode == 27){
    togglePopup(openPopup);
  }
}

function handleClickClose(evt){
  if(evt.target.classList.value.indexOf('popup') > -1){
    togglePopup(openPopup);
  }
};

function createElement(elementTitle, elementImg) {//чтобы создать карточку нам нужны её title и её image link
  const card = new Card(elementTitle, elementImg,'#card', pictureOpening, togglePopup);
  // отображаем на странице
  addElement(card.initializationElement());
};

function addElement(elementCopy){ // в качестве аргумента передаём то, что хотим добавить в конец ".elements"
  elements.prepend(elementCopy);
}

btnClose.addEventListener('click', function () {  //закрытие картинки
  togglePopup(pictureOpening);
});

// функции отвечающие за попапы

//edit

function openingEditForm(evt){
  validationForm(formEditButton);

  togglePopup(formEditButton);

  inputName.value = userName.textContent; //в форме будет показывать то значение, которые было в профиле
  inputInfo.value = userInfo.textContent;
}

function resetEditForm(){
  togglePopup(formEditButton);
}

function saveEditForm(event){
  event.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  userName.textContent = inputName.value;  //записываем значение полей в профиль
  userInfo.textContent = inputInfo.value;

  togglePopup(formEditButton);
}

//add

function openingAddForm(){
  validationForm(formAddButton);
  
  togglePopup(formAddButton);
}

function resetAddForm(){
  togglePopup(formAddButton);
}

function saveAddForm(event){
  event.preventDefault(); //Эта строчка отменяет стандартную отправку формы.

  createElement(inputTitle.value, inputLink.value);

  togglePopup(formAddButton);

  inputTitle.value = ""; //обнуляем ввёденное значение
  inputLink.value = "";
}

function validationForm(formElement) {
  const b = new FormValidator(tuningValidation, formElement);
  b.enableValidation();
}

            /*кнопки*/

editButton.addEventListener('click', openingEditForm);  //edit
formEditButton.addEventListener('reset', resetEditForm);
formEditButton.addEventListener('submit', saveEditForm);

addButton.addEventListener('click', openingAddForm);  //add
formAddButton.addEventListener('reset', resetAddForm);
formAddButton.addEventListener('submit', saveAddForm);


                /*код*/

initialCards.forEach(function(item) {
  createElement(item.name, item.link);
});




