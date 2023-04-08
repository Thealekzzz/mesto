import { showPopup } from "./utils/popupUtils.js";

const placeViewPopup = document.querySelector(".popup_type_view");
const placeViewPopupImage = placeViewPopup.querySelector(".popup__image");
const placeViewPopupCaption = placeViewPopup.querySelector(".popup__caption");

export default class Card {
    constructor(cardData, selector) {
        this._cardData = cardData;
        this._selector = selector;
        this._element = document.querySelector(this._selector).content;

    }

    _toggleLike(e) {
        e.target.classList.toggle("card__like-button_active");
    }
    
    _removeCard(e) {
        e.target.closest(".card-list-item").remove();
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
    
        cardItem.querySelector(".card__caption").textContent = this._cardData.name;
        cardImage.setAttribute("src", this._cardData.link);
        cardImage.setAttribute("alt", `${this._cardData.name}, фото.`);
    
        cardImage.addEventListener("click", () => this._handleCardClick());
        cardItem.querySelector(".card__like-button").addEventListener("click", this._toggleLike);
        cardItem.querySelector(".card__remove-button").addEventListener("click", this._removeCard);
    
    
        return cardItem;
    }
}