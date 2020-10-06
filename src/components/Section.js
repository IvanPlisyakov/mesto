export class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._readyContainer = [];
    
  }
  
  renderItems() {
    this._renderedItems.forEach((item) => {//обходим массив значений карточек
       this.addItem(this._renderer(item));//делаем из данных карточки готовую карточку //я сам не знаю почему это работает
    });
    
  }

  addItem(readyItem) {
    this._container.prepend(readyItem);
  }
}