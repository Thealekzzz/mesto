export default class UserInfo {
    constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
        this._userNameElement = document.querySelector(userNameSelector);
        this._userAboutElement = document.querySelector(userAboutSelector);
        this._userAvatarElement = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._userNameElement.textContent,
            about: this._userAboutElement.textContent,
            avatar: this._userAvatarElement.src
        };
    }

    setUserInfo({ name, about, avatar, _id }) {
        this._userNameElement.textContent = name;
        this._userAboutElement.textContent = about;
        this._userAvatarElement.src = avatar;
        this._id = _id;
    }
}