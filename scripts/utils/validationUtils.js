import FormValidator from "../FormValidator.js";
import { validationOptions } from "../data.js";

export function enableValidation(options) {
    const formList = Array.from(document.querySelectorAll(options.formSelector));

    // Для каждой формы создаю экземпляр класса FormValidator и запускаю enableValidation
    formList.forEach(formElement => {
        const formValidation = new FormValidator(validationOptions, formElement);
        formValidation.enableValidation();
    });
}

