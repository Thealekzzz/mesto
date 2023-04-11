import { showPopup } from "./utils/popupUtils.js";
import { placeViewPopup, placeViewPopupImage, placeViewPopupCaption } from "./consts.js";

export default class Card {
    constructor(cardData, selector) {
        this._cardData = cardData;
        this._selector = selector;
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
    
    _handleCardClick() {
        placeViewPopupImage.setAttribute("src", this._cardData.link);
        placeViewPopupImage.setAttribute("alt", `${this._cardData.name}, фото.`);
        placeViewPopupCaption.textContent = this._cardData.name;
    
        showPopup(placeViewPopup);
    }

    createCard() {
        const cardImage = this._cardElement.querySelector(".card__image");

        this._cardLikeButton = this._cardElement.querySelector(".card__like-button");
        this._cardRemoveButton = this._cardElement.querySelector(".card__remove-button");
    
        this._cardElement.querySelector(".card__caption").textContent = this._cardData.name;
        cardImage.setAttribute("src", this._cardData.link);
        cardImage.setAttribute("alt", `${this._cardData.name}, фото.`);
    
        cardImage.addEventListener("click", () => this._handleCardClick());
        this._cardElement.querySelector(".card__like-button").addEventListener("click", () => this._toggleLike());
        this._cardElement.querySelector(".card__remove-button").addEventListener("click", () => this._removeCard());
    
    
        return this._cardElement;
    }
}