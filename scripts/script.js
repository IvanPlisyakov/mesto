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

const btnClose = pictureOpening.querySelector('.profile-form__btn-close')

//функции

function togglePopup(blockName){  /* хоть где-то popup правильно написал... */
  blockName.classList.toggle("popap-active");
}

function createElement(elementTitle, elementImg) {//чтобы создать карточку нам нужны её title и её image link
  const elementCopy = cardTemplate.cloneNode(true);// клонируем содержимое тега template
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

  elements.append(elementCopy);// отображаем на странице
};

btnClose.addEventListener('click', function () {  //закрытие картинки
  togglePopup(pictureOpening);
});

// функции отвечающие за попапы

function openingEditForm(){
  togglePopup(formEditButton);

  inputName.value = userName.textContent; //в форме будет показывать то значение, которые было в профиле
  inputInfo.value = userInfo.textContent;
}

function saveEditForm(event){
  event.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  userName.textContent = inputName.value;  //записываем значение полей в профиль
  userInfo.textContent = inputInfo.value;

  togglePopup(formEditButton);
}

function openingAddForm(){
  togglePopup(formAddButton);
}

function saveAddForm(event){
  event.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  createElement(inputTitle.value, inputLink.value); //создаём картинку

  togglePopup(formAddButton);

  inputTitle.value = ""; //обнуляем ввёденное значение
  inputLink.value = "";
}

//кнопки

editButton.addEventListener('click', openingEditForm);  //edit
formEditButton.addEventListener('reset', () => togglePopup(formEditButton));
formEditButton.addEventListener('submit', saveEditForm);

addButton.addEventListener('click', openingAddForm);  //add
formAddButton.addEventListener('reset', () => togglePopup(formAddButton));
formAddButton.addEventListener('submit', saveAddForm);

//код

for (let i = 0; i < initialCards.length; i++){//создаём 6 карточек 
  createElement(initialCards[i].name, initialCards[i].link);
}



