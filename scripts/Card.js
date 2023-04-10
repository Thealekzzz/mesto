import { showPopup } from "./utils/popupUtils.js";
import { placeViewPopup, placeViewPopupImage, placeViewPopupCaption } from "./consts.js";

export default class Card {
    constructor(cardData, selector) {
        this._cardData = cardData;
        this._selector = selector;
        this._element = document.querySelector(this._selector).content;

    }

    _toggleLike() {
        this._cardLikeButton.classList.toggle("card__like-button_active");
    }
    
    _removeCard() {
        this._cardRemoveButton.closest(".card-list-item").remove();
        this._cardRemoveButton = null;
    }
    
    _handleCardClick() {
        placeViewPopupImage.setAttribute("src", this._cardData.link);
        placeViewPopupImage.setAttribute("alt", `${this._cardData.name}, фото.`);
        placeViewPopupCaption.textContent = this._cardData.name;
    
        showPopup(placeViewPopup);
    }

    createCard() {
        const cardItem = this._element.cloneNode(true);
        const cardImage = cardItem.querySelector(".card__image");

        this._cardLikeButton = cardItem.querySelector(".card__like-button");
        this._cardRemoveButton = cardItem.querySelector(".card__remove-button");
    
        cardItem.querySelector(".card__caption").textContent = this._cardData.name;
        cardImage.setAttribute("src", this._cardData.link);
        cardImage.setAttribute("alt", `${this._cardData.name}, фото.`);
    
        cardImage.addEventListener("click", () => this._handleCardClick());
        cardItem.querySelector(".card__like-button").addEventListener("click", () => this._toggleLike());
        cardItem.querySelector(".card__remove-button").addEventListener("click", () => this._removeCard());
    
    
        return cardItem;
    }
}