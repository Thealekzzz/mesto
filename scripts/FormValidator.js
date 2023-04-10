export default class FormValidator {
    constructor(validationOptions, formElement) {
        this._validationOptions = validationOptions;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._validationOptions.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._validationOptions.submitButtonSelector);
    }

    enableValidation() {
        this._setEventListeners();
    }

    _setEventListeners() {    
        this._inputList.forEach(inputElement => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                FormValidator.toggleButtonState(this._validationOptions, this._formElement, this._buttonElement);
            });
        });
    }
    
    _checkInputValidity(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        
        if (inputElement.validity.valid) {
            this._hideInputError(errorElement, inputElement);
    
        } else {
            this._showInputError(errorElement, inputElement, inputElement.validationMessage);
    
        }
    }
    
    _showInputError(errorElement, inputElement, validationMessage) {
        inputElement.classList.add(this._validationOptions.inputErrorClass);
        errorElement.classList.add(this._validationOptions.errorClass);
        errorElement.textContent = validationMessage;
    
    }
    
    _hideInputError(errorElement, inputElement) {
        inputElement.classList.remove(this._validationOptions.inputErrorClass);
        errorElement.classList.remove(this._validationOptions.errorClass);
        errorElement.textContent = "";
        
    }

    static toggleButtonState(options, formElement, buttonElement) {
        const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
        const isFormValid = inputList.every(inputElement => inputElement.validity.valid);

        if (isFormValid) {
            buttonElement.classList.remove(options.inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
            buttonElement.classList.add("hoverable");

        } else {
            buttonElement.classList.add(options.inactiveButtonClass);
            buttonElement.setAttribute("disabled", true);
            buttonElement.classList.remove("hoverable");

        }
    }
}

