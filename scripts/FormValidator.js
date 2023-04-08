import { toggleButtonState } from "./utils/validationUtils.js";

export default class FormValidator {
    constructor(validationOptions, formElement) {
        this._validationOptions = validationOptions;
        this._formElement = formElement;
    }

    enableValidation() {
        this._setEventListeners();
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._validationOptions.inputSelector));
        const buttonElement = this._formElement.querySelector(this._validationOptions.submitButtonSelector);
    
        inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(buttonElement);
            });
        });
    }
    
    _checkInputValidity(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        
        if (inputElement.validity.valid) {
            inputElement.classList.remove(this._validationOptions.inputErrorClass);
            this._hideInputError(errorElement);
    
        } else {
            inputElement.classList.add(this._validationOptions.inputErrorClass);
            this._showInputError(errorElement, inputElement.validationMessage);
    
        }
    }
    
    _showInputError(errorElement, validationMessage) {
        errorElement.classList.add(this._validationOptions.errorClass);
        errorElement.textContent = validationMessage;
    
    }
    
    _hideInputError(errorElement) {
        errorElement.classList.remove(this._validationOptions.errorClass);
        errorElement.textContent = "";
        
    }
    
    _toggleButtonState(buttonElement) {
        toggleButtonState(this._validationOptions, this._formElement, buttonElement)
    }
}

