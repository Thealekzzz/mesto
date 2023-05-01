import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);
        
        this.imageElement = this._popupElement.querySelector(".popup__image");
        this.captionElement = this._popupElement.querySelector(".popup__caption");
    }

    open({ link, cardName }) {
        super.open();

        this.imageElement.setAttribute("src", link);
        this.imageElement.setAttribute("alt", `${cardName}, фото.`);
        this.captionElement.textContent = cardName;


    }
}