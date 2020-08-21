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

const form = document.querySelector(".form"); //форма
const formTitle = document.querySelector(".profile-form__title");  //заголовок формы
const editButton = document.querySelector(".profile__edit-button"); //создать форму
const addButton = document.querySelector(".profile__add-button"); //создать форму

const inputName = document.querySelector(".profile-form__user_data_name"); //связываем поля формы с соотв. переменными
const inputInfo = document.querySelector(".profile-form__user_data_info");

const userName = document.querySelector(".profile__user-name");  //связываем данные профиля с переменными
const userInfo = document.querySelector(".profile__user-info");

let state; //отслеживаем какой попап открыт

//функции

function smoothCloseOpenPopup(blockName){  /* хоть где-то popup правильно написал... */
  if(blockName.classList.contains('popap-active') == false){  //если попав не активен то мы убираем закрытие, добавляем открытие и добавляем disaply:block;
    blockName.classList.remove("popap-close");  //убираем закрытие
    blockName.classList.add("popap-open");  //добавляем открытие
    blockName.classList.add("popap-active");  //активируем display
  }else{
    blockName.classList.remove("popap-open");  // НЕ убираем закрытие
    blockName.classList.add("popap-close"); // НЕ добавляем открытие
    setTimeout(function() {
      blockName.classList.remove("popap-active");  // НЕ активируем display
    }, 1000); //задержка для того, чтобы увидеть закрытие
  }
}

function createElement(elementTitle, elementImg) {//чтобы создать карточку нам нужны её title и её image link
  const elementCopy = cardTemplate.cloneNode(true);// клонируем содержимое тега template
  const elementImage = elementCopy.querySelector('.element__image');

  elementCopy.querySelector('.element__title').textContent = elementTitle;  // добавление имени
  elementImage.setAttribute('src', elementImg);  // добавление картинки

  elementImage.addEventListener('click', function () {// открытие картинки
    pictureOpening.querySelector('.picture-opening__title').textContent = elementTitle; // имя картинки
    pictureOpening.querySelector('.picture-opening__img').setAttribute('src', elementImg);  //вставляем картинку

    smoothCloseOpenPopup(pictureOpening);

    pictureOpening.querySelector('.profile-form__btn-close').addEventListener('click', function () {  //закрытие картинки
      smoothCloseOpenPopup(pictureOpening);
    });
  });

  elementCopy.querySelector('.element__btn-like').addEventListener('click', function (evt) { /*inst: vanishhhhhhhhh проверьте, пожалуйста, работают ли там лайки тоже*/
    evt.target.classList.toggle('element__btn-like_active');
  });

  elementCopy.querySelector('.element__btn-delete').addEventListener('click', function (evt) {// удаление карточки + изм. количества карточек
    evt.target.closest(".element").remove();//обращаемся к ближайщему родителю ".element" и удаляем его
  });

  elements.append(elementCopy);// отображаем на странице
};

// функции отвечающие за попапы

function Form(nameButton) {  //создание нужной нам формы
  switch (nameButton) {
    case 'editButton':
      modificationFormEditButton();
      break;
    case 'addButton':
      modificationFormAddButton();
      break;
  }
  state = nameButton;
  initializationForm();
}

function initializationForm(){ //создаём основу нашего попапа (которая, пока что, одинаковая)
  smoothCloseOpenPopup(form);
}

function modificationFormEditButton(){ //если нажали EditButton, то сделай соотв. изм.
  inputName.value = userName.textContent; //в форме будет показывать то значение, которые было в профиле
  inputInfo.value = userInfo.textContent;
  formTitle.textContent = "Редактировать профиль";
}

function modificationFormAddButton(){ //если нажали AddButton, то сделай соотв. изм.
  inputName.value = ""; //обнуляем введённое значение
  inputInfo.value = "";
  inputName.placeholder = "Название";  // здесь значения по умолчанию
  inputInfo.placeholder = "Ссылка на картинку";
  formTitle.textContent = "Новое место";
}

function closeForm() {
  smoothCloseOpenPopup(form);
}

function saveForm(event) {
  event.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  switch (state){
    case 'editButton':
      saveFormEditButton();
      break;
    case 'addButton':
      saveFormAddButton();
      break;
  }
  closeForm();  //закрытие формы
}

function saveFormEditButton(){  //изм. текст профиля
  userName.textContent = inputName.value;  //записываем значение полей в профиль
  userInfo.textContent = inputInfo.value;
}

function saveFormAddButton(){  // + картинка
  createElement(inputName.value, inputInfo.value);
}

//кнопки

editButton.addEventListener('click', () => Form('editButton'));
addButton.addEventListener('click', () => Form('addButton'));
form.addEventListener('reset', closeForm);
form.addEventListener('submit', saveForm);

//код

for (let i = 0; i < initialCards.length; i++){//создаём 6 карточек 
  createElement(initialCards[i].name, initialCards[i].link);
}



