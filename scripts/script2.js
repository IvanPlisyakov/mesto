



/*function creatElement(elementTitle, elementImg) {
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

for (let i = 0; i < numberOfCards; i++){//создаём 6 карточек 
  creatElement(initialCards[i].name, initialCards[i].link);
  console.log(5);
}*/



