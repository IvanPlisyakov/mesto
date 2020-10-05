//import lilkristalllImage from 'images/element-lil_krystalll.png';
import lilkristalllImage from '../images/element-lil_krystalll.png';
import opgImage from '../images/element-opg.jpg';
import opiatesImage from '../images/element-opiates.jpg';
import rnbclubImage from '../images/element-rnb_club.jpg';
import sweetdreamsImage from '../images/element-sweet_dreams.jpg';
import nolabelImage from '../images/element-no_label.jpg';

export const initialCards = [
  {
      name: 'LIL KRYSTALLL',
      link: lilkristalllImage
  },
  {
      name: 'ОПГ СИТИ',
      link: opgImage
  },
  {
      name: 'Опиаты Круг',
      link: opiatesImage
  },
  {
      name: 'РНБ КЛУБ',
      link: rnbclubImage
  },
  {
      name: 'Сладких снов',
      link: sweetdreamsImage
  },
  {
      name: 'NO LABEL',
      link: nolabelImage
  }
];

export const tuningValidation = {
  form: '.profile-form',
  inputTypeError: 'profile-form__user_type_error',
  inputErrorActive: 'profile-form__user-error_active',
  formInput: '.profile-form__user',
  formSubmit: '.profile-form__btn-save',
  buttonInctive: 'profile-form__btn-save_inactive',
};

//переменные связанные с попапами

export const formEditButton = document.querySelector(".form_edit-button"); //формы
export const formAddButton = document.querySelector(".form_add-button");

export const editButton = document.querySelector(".profile__edit-button"); //профиль 
export const addButton = document.querySelector(".profile__add-button"); 