export class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._readyContainer = [];
    
  }
  
  renderItems() {
    this._renderedItems.forEach((item) => {//обходим массив значений карточек
       this._readyContainer.push(this._renderer(item).initializationElement());//делаем из данных карточки готовую карточку //я сам не знаю почему это работает
    });
    
  }

  addItem(readyItem) {
    this._container.prepend(readyItem);
  }

  initializationItems() {
    this.renderItems();//создаём массив готовых карточек
    this._readyContainer.forEach((readyItem) => {//берём массив готовых карточек и добавляем каждую в контейнер
      this.addItem(readyItem);
    });
  }

}