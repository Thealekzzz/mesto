export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    _checkResponce(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

    async getInitialCards() {
        const res = await fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        });
        return this._checkResponce(res);
    }

    async getUserData() {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers
        });
        return this._checkResponce(res);
    }

    async patchUserData(userData) {
        const res = await fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(userData)
        });
        return this._checkResponce(res);
    }

    async addCard(cardData) {
        const res = await fetch(`${this.baseUrl}/cards`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(cardData)
        });
        return this._checkResponce(res);
    }

    async removeCard(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: "DELETE",
            headers: this.headers,
        });
        return this._checkResponce(res);
    }

    async likeCard(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this.headers,
        });
        return this._checkResponce(res);
    }

    async unlikeCard(cardId) {
        const res = await fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this.headers,
        });
        return this._checkResponce(res);
    }

    async updateAvatar(url) {
        const res = await fetch(`${this.baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                avatar: url
            })
        });
        return this._checkResponce(res);
    }
}