function enableValidation(options) {
    const formList = Array.from(document.querySelectorAll(options.formSelector));

    formList.forEach(formElement => {
        setEventListeners(options, formElement);
    });
}

function setEventListeners(options, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
    const buttonElement = formElement.querySelector(options.submitButtonSelector);

    inputList.forEach(inputElement => {
        inputElement.addEventListener("input", () => {
            checkInputValidity(options, formElement, inputElement);
            toggleButtonState(options, formElement, buttonElement);
        });
    });
}

function checkInputValidity(options, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    if (inputElement.validity.valid) {
        inputElement.classList.remove(options.inputErrorClass);
        hideInputError(options, errorElement);

    } else {
        inputElement.classList.add(options.inputErrorClass);
        showInputError(options, errorElement, inputElement.validationMessage);

    }
}

function showInputError(options, errorElement, validationMessage) {
    errorElement.classList.add(options.errorClass);
    errorElement.textContent = validationMessage;

}

function hideInputError(options, errorElement) {
    errorElement.classList.remove(options.errorClass);
    errorElement.textContent = "";
    
}

function toggleButtonState(options, formElement, buttonElement) {
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

function checkPopupValidation(options, popupElement) {
    const formElement = popupElement.querySelector(options.formSelector);
    const buttonElement = popupElement.querySelector(options.submitButtonSelector);

    // Валидировать попап при открытии
    if (formElement && buttonElement) {
        toggleButtonState(options, formElement, buttonElement);

    }

}

