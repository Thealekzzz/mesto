import { api, deletePopup, userInfo } from "..";

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
        if (this._cardData.likes.some(userLiked => (userLiked._id === userInfo._id))) {
            api.unlikeCard(this._cardData._id)
            .then(cardData => {
                this._cardData = cardData;
                this._updateLikesCount();
            })
            
        } else {
            api.likeCard(this._cardData._id)
            .then(cardData => {
                this._cardData = cardData;
                this._updateLikesCount();
            })
        }

        this._cardLikeButton.classList.toggle("card__like-button_active");
    }

    _updateLikesCount() {
        this._cardLikesElement.textContent = this._cardData.likes.length;
    }
    
    _removeCard() {
        api.removeCard(this._cardData._id)
        .then(res => {
            this._cardElement.remove();
            this._cardElement = null;
        })
    }

    _showDeletePopup() {
        deletePopup.setHandleSubmit(this._removeCard.bind(this));
        deletePopup.open();
    }

    createCard() {
        const cardImageElement = this._cardElement.querySelector(".card__image");
        cardImageElement.setAttribute("src", this._cardData.link);
        cardImageElement.setAttribute("alt", `${this._cardData.name}, фото.`);
        cardImageElement.addEventListener("click", () => this._handleCardClick());

        this._cardLikeButton = this._cardElement.querySelector(".card__like-button");
        this._cardLikeButton.addEventListener("click", () => this._toggleLike());
        
        this._cardLikesElement = this._cardElement.querySelector(".card__like-count");
        this._cardLikesElement.textContent = this._cardData.likes.length;
    
        this._cardElement.querySelector(".card__caption").textContent = this._cardData.name;

        if (this._cardData.owner._id === userInfo._id) {
            this._cardRemoveButton = this._cardElement.querySelector(".card__remove-button");
            this._cardRemoveButton.addEventListener("click", () => this._showDeletePopup());
        } else {
            this._cardElement.querySelector(".card__remove-button").remove();
        }

        // Если на карточке есть лайк текущего профиля - сделать лайк активным
        if (this._cardData.likes.some(userLiked => userLiked._id === userInfo._id)) {
            this._cardLikeButton.classList.toggle("card__like-button_active");
        }


    
    
        return this._cardElement;
    }

    updateLikesCount(likes) {
        this._cardData.likes = likes;
        this._cardLikesElement.textContent = likes.length;
    }
}