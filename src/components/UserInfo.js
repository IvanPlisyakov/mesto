export class UserInfo {
  constructor(dataSelectorsProfile) {
    this._profileName = document.querySelector(dataSelectorsProfile.name);
    this._profileInfo = document.querySelector(dataSelectorsProfile.info);
    this._userName = document.querySelector(".profile__user-name");
    this._userInfo = document.querySelector(".profile__user-info");
  }
  
  getUserInfo() {
    return {//объект с данными пользователя
      name: this._profileName.textContent,
      info: this._profileInfo.textContent,
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data[0];
    this._userInfo.textContent = data[1];
  }
}