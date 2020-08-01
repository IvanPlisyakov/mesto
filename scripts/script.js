let page = document.querySelector(".page");
let profile = page.querySelector(".profile");
let editButton = profile.querySelector(".profile__edit-button");
let form = page.querySelector(".form");

function closeProfileForm() { //удаляем форму
  form.innerHTML = ``;
}

function openProfileForm() { //функция отвечает за создание формы и всё, что с ней связано
  form.innerHTML = `
  <div class="overlay-form"></div>
  <div class="cover-form cover-form_margin">
    <form class="profile-form profile-form_margin">
      <h2 class="profile-form__title">Редактировать профиль</h2>
      <input class="profile-form__user profile-form__user_data_name" type="text" value="Жак-Ив Кусто">
      <input class="profile-form__user profile-form__user_data_info" type="text" value="Исследователь океана">
      <input class="profile-form__btn-save" type="button" value="Сохранить">
      <input class="profile-form__btn-close" type="button">
    </form>
  </div>
`; //при нажатии на edit-button добовляем разметку форму в нужный нам сектор с классом form
  let btnClose = form.querySelector(".profile-form__btn-close");//кнопка закрытия формы
  btnClose.addEventListener('click', closeProfileForm);//при клике вызываем удаление формы

  function formSubmitHandler (evt){
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    let nameInput = form.querySelector(".profile-form__user_data_name"); //связываем поля формы с соотв. переменными
    let infoInput = form.querySelector(".profile-form__user_data_info");

    let newName = nameInput.value; //забираем значение с полей 
    let newInfo = infoInput.value;

    let userName = profile.querySelector(".profile__user-name");  //связываем данные профиля с переменными
    let userInfo = profile.querySelector(".profile__user-info");

    userName.textContent = newName; //присваиваем значение полей к профилю нашей страницы
    userInfo.textContent = newInfo;
  }

  let btnSave = form.querySelector(".profile-form__btn-save"); //кнопка "Сохранить"

  btnSave.addEventListener('click', formSubmitHandler);  //при нажатии вызываем функцию отвечающую за форму
  btnSave.addEventListener('click', closeProfileForm);  //закрываем форму
}

editButton.addEventListener('click', openProfileForm);  //открываем форму
