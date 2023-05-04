export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }

    getInitialCards() {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/cards`, {
                headers: this.headers
            })
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        });
    }

    getUserData() {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/users/me`, {
                headers: this.headers
            })
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        });
    }

    patchUserData(userData) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/users/me`, {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify(userData)
            })
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        });
    }

    addCard(cardData) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/cards`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(cardData)
            })
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        });
    }

    removeCard(cardId) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/cards/${cardId}`, {
                method: "DELETE",
                headers: this.headers,
            })
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        });
    }

    likeCard(cardId) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: this.headers,
            })
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        });
    }

    unlikeCard(cardId) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: "DELETE",
                headers: this.headers,
            })
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        });
    }

    updateAvatar(url) {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}/users/me/avatar`, {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify({
                    avatar: url
                })
            })
                .then(res => res.json())
                .then(resolve)
                .catch(reject);
        });

    }

}