import FormValidator from "../FormValidator.js";

export function enableValidation(options) {
    const formElements = [
        document.querySelector(".popup__form_type_edit"),
        document.querySelector(".popup__form_type_new-place"),
    ];

    // Для каждой формы создаю экземпляр класса FormValidator
    const formValidators = formElements.map(formElement => new FormValidator(options, formElement));

    // Для каждого экземпляра класса FormValidator запускаю enableValidation
    formValidators.forEach(formValidator => {
        formValidator.enableValidation();
    })

    return formValidators;
}

