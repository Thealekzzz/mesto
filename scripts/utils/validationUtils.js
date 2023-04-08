import FormValidator from "../FormValidator.js";
import { validationOptions } from "../data.js";

export function enableValidation(options) {
    const formList = Array.from(document.querySelectorAll(options.formSelector));

    formList.forEach(formElement => {
        const formValidation = new FormValidator(validationOptions, formElement);
        formValidation.enableValidation();
    });
}

export function toggleButtonState(options, formElement, buttonElement) {
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

export function checkPopupValidation(options, popupElement) {
    const formElement = popupElement.querySelector(options.formSelector);
    const buttonElement = popupElement.querySelector(options.submitButtonSelector);

    // Валидировать попап при открытии
    if (formElement && buttonElement) {
        toggleButtonState(options, formElement, buttonElement);

    }

}

