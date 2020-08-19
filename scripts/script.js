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

let numberOfCards = 6; // отслеживаем кол-во карточек на сайте

//переменные связанные с попапами

const form = document.querySelector(".form"); //форма
const formTitle = form.querySelector(".profile-form__title");  //заголовок формы
const editButton = document.querySelector(".profile__edit-button"); //создать форму
const addButton = document.querySelector(".profile__add-button"); //создать форму

const inputName = form.querySelector(".profile-form__user_data_name"); //связываем поля формы с соотв. переменными
const inputInfo = form.querySelector(".profile-form__user_data_info");

const userName = document.querySelector(".profile__user-name");  //связываем данные профиля с переменными
const userInfo = document.querySelector(".profile__user-info");

let state; //отслеживаем какой попап открыт

// функции отвечающие за попапы

function createForm(nameButton) {
  switch (nameButton) {
    case 'editButton':
      inputName.value = userName.textContent; //в форме будет показывать то значение, которые было в профиле
      inputInfo.value = userInfo.textContent;
      formTitle.textContent = "Редактировать профиль";
      break;
    case 'addButton':
      inputName.value = ""; //обнуляем введённое значение
      inputInfo.value = "";
      inputName.placeholder = "Название";  // здесь значения по умолчанию
      inputInfo.placeholder = "Ссылка на картинку";
      formTitle.textContent = "Новое место";
      break;
  }
  state = nameButton;
  form.classList.add("popap-open");  //создаём форму
  form.style.animation = "popap-open 0.5s linear";
}

function closeForm() {
  form.style.animation = "popap-close 0.5s linear";  //плавно затемняем
  setTimeout(function() {
    form.classList.remove("popap-open");  //удаляем через 0.45 секунды
  }, 450);
}

function saveForm(event) {
  event.preventDefault(); //Эта строчка отменяет стандартную отправку формы.
  switch (state){
    case 'editButton':
      userName.textContent = inputName.value;  //записываем значение полей в профиль
      userInfo.textContent = inputInfo.value;
      break;
    case 'addButton':
      if (numberOfCards == 6) { //если карточек шесть, удаляем первую
        elements.querySelector('.element').remove()
        numberOfCards--;  
      }
      createElement(inputName.value, inputInfo.value);
      numberOfCards++;
  }

  closeForm();  //закрытие формы
}

// функции отвечающие за создание картинок

function createElement(elementTitle, elementImg) {//чтобы создать карточку нам нужны её title и её image link
  if (elementImg == "") { //прикольно же, не?
    elementImg = "images/picture-opening_ERROR.jpg";
  }
  const elementCopy = cardTemplate.cloneNode(true);// клонируем содержимое тега template

  elementCopy.querySelector('.element__title').textContent = elementTitle;  // добавление имени
  elementCopy.querySelector('.element__image').setAttribute('src', elementImg);  // добавление картинки

  elementCopy.querySelector('.element__image').addEventListener('click', function () {// открытие картинки
    pictureOpening.querySelector('.picture-opening__title').textContent = elementTitle; // имя картинки
    pictureOpening.querySelector('.picture-opening__img').setAttribute('src', elementImg);  //вставляем картинку

    pictureOpening.classList.add("picture-opening_active");  //активируем display
    pictureOpening.style.animation = "popap-open 0.5s linear";

    pictureOpening.querySelector('.profile-form__btn-close').addEventListener('click', function () {  //закрытие картинки
      pictureOpening.style.animation = "popap-close 0.5s linear";
      setTimeout(function() {
        pictureOpening.classList.remove("picture-opening_active");  //не активируем display
      }, 450);
    });
  });

  elementCopy.querySelector('.element__btn-like').addEventListener('click', function (evt) {// inst: vanishhhhhhhhh проверьте, пожалуйста, работают ли там лайки тоже
    evt.target.classList.toggle('element__btn-like_active');
  });

  elementCopy.querySelector('.element__btn-delete').addEventListener('click', function (evt) {// удаление карточки + изм. количества карточек
    evt.target.closest(".element").remove();//обращаемся к ближайщему родителю ".element" и удаляем его
    numberOfCards--; // когда мы удаляем карточку их становиться на одну меньше (wow!)
  });

  elements.append(elementCopy);// отображаем на странице
};

// кнопки

editButton.addEventListener('click', () => createForm('editButton'));
addButton.addEventListener('click', () => createForm('addButton'));
form.addEventListener('reset', closeForm);
form.addEventListener('submit', saveForm);

// код

for (let i = 0; i < numberOfCards; i++){//создаём 6 карточек 
  createElement(initialCards[i].name, initialCards[i].link);
}



