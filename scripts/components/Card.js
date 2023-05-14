export default class Card {
    constructor(cardData, selector, handleCardClick, handleCardRemove, handleCardLike, userId) {
        this._cardData = cardData;
        this._selector = selector;
        this._handleCardClick = handleCardClick;
        this._handleCardRemove = handleCardRemove;
        this._handleCardLike = handleCardLike;
        this._userId = userId;
        this._cardElement = this._getTemplate();

    }

    _getTemplate() {
        return document
            .querySelector(this._selector)
            .content
            .querySelector(".card-list-item")
            .cloneNode(true);
    }

    _setEventListeners() {
        this.cardImageElement.addEventListener("click", () => this._handleCardClick());
        this.cardLikeButton.addEventListener("click", this._handleCardLike.bind(this));
        
        if (this._cardData.owner._id === this._userId) {
            this._cardRemoveButton.addEventListener("click", this._handleCardRemove.bind(this));
        }

    }

    updateLikesCount() {
        this._cardLikesElement.textContent = this._cardData.likes.length;
    }

    setLikesCount(likes) {
        this._cardData.likes = likes;
        this._cardLikesElement.textContent = likes.length;
    }

    createCard() {
        this.cardImageElement = this._cardElement.querySelector(".card__image");
        this.cardImageElement.setAttribute("src", this._cardData.link);
        this.cardImageElement.setAttribute("alt", `${this._cardData.name}, фото.`);

        this.cardLikeButton = this._cardElement.querySelector(".card__like-button");
        
        this._cardLikesElement = this._cardElement.querySelector(".card__like-count");
        this._cardLikesElement.textContent = this._cardData.likes.length;
    
        this._cardElement.querySelector(".card__caption").textContent = this._cardData.name;

        if (this._cardData.owner._id === this._userId) {
            this._cardRemoveButton = this._cardElement.querySelector(".card__remove-button");
        } else {
            this._cardElement.querySelector(".card__remove-button").remove();
        }

        // Если на карточке есть лайк текущего профиля - сделать лайк активным
        if (this._cardData.likes.some(userLiked => userLiked._id === this._userId)) {
            this.cardLikeButton.classList.toggle("card__like-button_active");
        }

        this._setEventListeners();
    
        return this._cardElement;
    }

    deleteCard() {
        this._cardElement.remove();
        this._cardElement = null;
    }

    getCardData() {
        return this._cardData;
    }

    setCardData(data) {
        this._cardData = data;
    }

    getCardId() {
        return this._cardData._id;
    }
}