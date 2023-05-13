import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selector, { handleSubmit, handleOpen }) {
        super(selector);

        this._handleSubmit = handleSubmit;
        this._handleOpen = handleOpen;
        this._formElement = this._popupElement.querySelector(".popup__form");
        this._submitButton = this._popupElement.querySelector(".popup__submit-button");
        this._buttonText = this._submitButton.textContent;
    }

    open() {
        this.setLoading(false);
        super.open();
        
        // Если была передана функция, обрабатывающая открытие попапа - запускаю ее
        this._handleOpen?.();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", this._handleSubmit.bind(this));
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    fillFormWithData(data) {
        for (let key in data) {
            if (key === "avatar") continue;
            this._formElement[key].value = data[key];
        }
    }

    setLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = "Сохранение...";
        } else {
            this._submitButton.textContent = this._buttonText;
        }
    }

    _getInputValues() {
        return Array.from(this._formElement.querySelectorAll(".popup__input"))
        .reduce((acc, inputElement) => {
            acc[inputElement.name] = inputElement.value;
            return acc;
        }, {});
    }


}