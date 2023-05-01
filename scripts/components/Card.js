export default class Card {
    constructor(cardData, selector, handleCardClick) {
        this._cardData = cardData;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._cardElement = this._getTemplate();

    }

    _getTemplate() {
        return document
            .querySelector(this._selector)
            .content
            .querySelector(".card-list-item")
            .cloneNode(true);
    }

    _toggleLike() {
        this._cardLikeButton.classList.toggle("card__like-button_active");
    }
    
    _removeCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    createCard() {
        const cardImageElement = this._cardElement.querySelector(".card__image");

        this._cardLikeButton = this._cardElement.querySelector(".card__like-button");
        this._cardRemoveButton = this._cardElement.querySelector(".card__remove-button");
    
        this._cardElement.querySelector(".card__caption").textContent = this._cardData.name;
        cardImageElement.setAttribute("src", this._cardData.link);
        cardImageElement.setAttribute("alt", `${this._cardData.name}, фото.`);
    
        cardImageElement.addEventListener("click", () => this._handleCardClick());
        this._cardElement.querySelector(".card__like-button").addEventListener("click", () => this._toggleLike());
        // this._cardElement.querySelector(".card__remove-button").addEventListener("click", () => this._removeCard());
    
    
        return this._cardElement;
    }
}