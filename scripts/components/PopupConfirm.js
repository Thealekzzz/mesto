import Popup from "./Popup";

export default class PopupConfirm extends Popup {
    constructor(selector, { handleSubmit } = {}) {
        super(selector);

        this._handleSubmit = handleSubmit;
        this._submitButton = this._popupElement.querySelector(".popup__submit-button");
    }

    setHandleSubmit(handleSubmit) {
        this._handleSubmit = handleSubmit;
    }

    setEventListeners() {
        super.setEventListeners();

        this._submitButton.addEventListener("click", () => {
            this._handleSubmit();
            this.close();
        });
    }
}