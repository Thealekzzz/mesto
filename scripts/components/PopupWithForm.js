import Popup from "./Popup.js";
import FormValidator from "./FormValidator.js";
import { validationOptions } from "../data.js";

export default class PopupWithForm extends Popup {
    constructor(selector, handleSubmit, handleOpen) {
        super(selector);

        this._handleSubmit = handleSubmit;
        this._handleOpen = handleOpen;
        this._formElement = this._popupElement.querySelector(".popup__form");
        this._submitButton = this._popupElement.querySelector(".popup__submit-button");

        this._validator = new FormValidator(validationOptions, this._formElement);
        this._validator.enableValidation();
    }

    open() {
        super.open();
        
        // Если была передана функция, обрабатывающая открытие попапа - запускаю ее
        this._handleOpen?.();

        this._validator.validateForm();
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", (e) => this._handleSubmit(e));
    }

    close() {
        super.close();
        this._formElement.reset();
    }

    fillFormWithData(data) {
        for (let key in data) {
            this._formElement[key].value = data[key];
        }
    }

    getInputValues() {
        return Array.from(this._formElement.querySelectorAll(".popup__input"))
        .reduce((acc, inputElement) => {
            acc[inputElement.name] = inputElement.value;
            return acc;
        }, {});
    }


}