            /*переменные*/


//переменные связанные с карточками

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

const cardTemplate = document.querySelector('#card').content;//template
const elements = document.querySelector('.elements');//секция для карточек

const pictureOpening = document.querySelector('.picture-opening');//секция открытой карточки  

//переменные связанные с попапами

const formEditButton = document.querySelector(".form_edit-button"); //формы
const formAddButton = document.querySelector(".form_add-button");

const formTitle = document.querySelector(".profile-form__title");  //заголовок формы
const editButton = document.querySelector(".profile__edit-button"); //создать форму  
const addButton = document.querySelector(".profile__add-button"); //создать форму

const inputName = formEditButton.querySelector(".profile-form__user_data_name"); //связываем поля 'edit' формы с соотв. переменными
const inputInfo = formEditButton.querySelector(".profile-form__user_data_info");

const inputTitle = formAddButton.querySelector(".profile-form__user_data_name"); //связываем поля 'add' формы с соотв. переменными
const inputLink = formAddButton.querySelector(".profile-form__user_data_info");

const userName = document.querySelector(".profile__user-name");  //связываем данные профиля с переменными
const userInfo = document.querySelector(".profile__user-info");

const btnClose = pictureOpening.querySelector('.profile-form__btn-close');

const buttonSaveList = Array.from(document.querySelectorAll(".profile-form__btn-save"));
                /*функции*/


function togglePopup(blockName){  /* хоть где-то popup правильно написал... */
  if(!togglePopup.value){
    togglePopup.value = 0;
  }

  if(togglePopup.value == 1){
    togglePopup.value = 0;
  } else {
    togglePopup.value = 1;
  }

  blockName.classList.toggle("popap-active");

  if(document.value = 1){
    switch (blockName) {
      case formEditButton:
        document.addEventListener('keydown', resetKeyEditForm);
        break;
      case formAddButton:
        document.addEventListener('keydown', resetKeyAddForm);
        break;
    }
  } else {
    switch (blockName) {
      case formEditButton:
        document.removeEventListener('keydown', resetKeyEditForm);
        break;
      case formAddButton:
        document.removeEventListener('keydown', resetKeyAddForm);
        break;
    }
  }
}

function createElement(elementTitle, elementImg) {//чтобы создать карточку нам нужны её title и её image link
  // отображаем на странице
  addElement(initializationElement(elementTitle, elementImg));
};

function initializationElement(elementTitle, elementImg){
  const elementCopy = cardTemplate.cloneNode(true); // клонируем содержимое тега template
  const elementImage = elementCopy.querySelector('.element__image');

  elementCopy.querySelector('.element__title').textContent = elementTitle;  // добавление имени
  elementImage.setAttribute('src', elementImg);  // добавление картинки

  elementImage.addEventListener('click', function () {// открытие картинки
    pictureOpening.querySelector('.picture-opening__title').textContent = elementTitle; // имя картинки
    pictureOpening.querySelector('.picture-opening__img').setAttribute('src', elementImg);  //вставляем картинку

    togglePopup(pictureOpening);
  });

  elementCopy.querySelector('.element__btn-like').addEventListener('click', function (evt) { /*inst: vanishhhhhhhhh проверьте, пожалуйста, работают ли там лайки тоже*/
    evt.target.classList.toggle('element__btn-like_active');
  });

  elementCopy.querySelector('.element__btn-delete').addEventListener('click', function (evt) {// удаление карточки 
    evt.target.closest(".element").remove();//обращаемся к ближайщему родителю ".element" и удаляем его
  });

  return elementCopy;
}

function addElement(elementCopy){ // в качестве аргумента передаём то, что хотим добавить в конец ".elements"
  elements.append(elementCopy);
}

btnClose.addEventListener('click', function () {  //закрытие картинки
  togglePopup(pictureOpening);
});

// функции отвечающие за попапы

//edit

function openingEditForm(evt){
  togglePopup(formEditButton);

  inputName.value = userName.textContent; //в форме будет показывать то значение, которые было в профиле
  inputInfo.value = userInfo.textContent;

  formEditButton.addEventListener('click', resetClickEditForm);  //resetClickEditForm
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

function resetKeyEditForm(evt){
  if(evt.keyCode === 27){
    togglePopup(formEditButton);
    document.removeEventListener('keydown', resetKeyEditForm);
  }
}

function resetClickEditForm(evt){
  if(evt.target.classList.value.indexOf('profile-form') < 0){
    togglePopup(formEditButton);
  }
};

//add

function openingAddForm(){
  togglePopup(formAddButton);

  formAddButton.addEventListener('click', resetClickAddForm);  //resetClickAddForm
}

function resetAddForm(){
  togglePopup(formAddButton);
}

function saveAddForm(event){
  event.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  createElement(inputTitle.value, inputLink.value); //создаём картинку

  togglePopup(formAddButton);

  inputTitle.value = ""; //обнуляем ввёденное значение
  inputLink.value = "";
}

function resetKeyAddForm(evt){
  if(evt.keyCode === 27){
    togglePopup(formAddButton);

    document.removeEventListener('keydown', resetKeyAddForm);
  }
}

function resetClickAddForm(evt){
  if(evt.target.classList.value.indexOf('profile-form') < 0){
    togglePopup(formAddButton);
  }
};

            /*кнопки*/

editButton.addEventListener('click', openingEditForm);  //edit
formEditButton.addEventListener('reset', resetEditForm);
formEditButton.addEventListener('submit', saveEditForm);

addButton.addEventListener('click', openingAddForm);  //add
formAddButton.addEventListener('reset', resetAddForm);
formAddButton.addEventListener('submit', saveAddForm);

/*function exitEscPopup(){
  const formList = Array.from(formElement.querySelectorAll('.profile-form__user'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
}*/

/*function exitEscEditPopap(evt){
  if(evt.keyCode == 27){
    alert(5);
  }
}*/



//formEditButton.addEventListener('keydown', exitEscEditPopap);

                /*код*/

for (let i = 0; i < initialCards.length; i++){//создаём 6 карточек 
  createElement(initialCards[i].name, initialCards[i].link);
}

//enableValidation();











