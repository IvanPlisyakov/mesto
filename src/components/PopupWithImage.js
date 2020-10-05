import {Popup} from '../components/Popup.js';
export class PopupWithImage extends Popup {
  open(dataImage) {
    document.querySelector('.picture-opening__title').textContent = dataImage.name; // имя картинки
    document.querySelector('.picture-opening__img').setAttribute('src', dataImage.link);  //вставляем картинку
    super.open();
  }
}