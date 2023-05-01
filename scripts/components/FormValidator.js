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
                this.toggleButtonState();
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

    toggleButtonState() {
        const isFormValid = this._inputList.every(inputElement => inputElement.validity.valid);

        if (isFormValid) {
            this._buttonElement.classList.remove(this._validationOptions.inactiveButtonClass);
            this._buttonElement.removeAttribute("disabled");
            this._buttonElement.classList.add("hoverable");

        } else {
            this._buttonElement.classList.add(this._validationOptions.inactiveButtonClass);
            this._buttonElement.setAttribute("disabled", true);
            this._buttonElement.classList.remove("hoverable");

        }
    }
}

