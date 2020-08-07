let form = document.querySelector(".form"); //форма
let editButton = document.querySelector(".profile__edit-button"); //создать форму

let inputName = form.querySelector(".profile-form__user_data_name"); //связываем поля формы с соотв. переменными
let inputInfo = form.querySelector(".profile-form__user_data_info");

let userName = document.querySelector(".profile__user-name");  //связываем данные профиля с переменными
let userInfo = document.querySelector(".profile__user-info");

function createForm() {
  inputName.value = userName.textContent; //в форме будет показывать то значение, которые было в профиле
  inputInfo.value = userInfo.textContent;

  form.classList.add("form_open");  //создаём форму
}

function closeForm() {
  form.classList.remove("form_open");  //удаляем форму
}

function saveForm(event) {
  event.preventDefault(); //Эта строчка отменяет стандартную отправку формы.

  userName.textContent = inputName.value;  //записываем значение полей в профиль
  userInfo.textContent = inputInfo.value;
 
  closeForm();  //закрытие формы
}

editButton.addEventListener('click', createForm);
form.addEventListener('reset', closeForm);
form.addEventListener('submit', saveForm);
