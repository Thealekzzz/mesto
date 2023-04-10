import { validationOptions } from "../data.js";
import { renderCard } from "./cardUtils.js";
import { placeAddPopup, inputPlaceAddTitle, inputPlaceAddImageUrl, profileEditPopup, 
    profileName, profileAbout, inputEditName, inputEditAbout } from "../consts.js";
import FormValidator from "../FormValidator.js";

export function showPopup(popupElement) {
    // Открытие попапа
    popupElement.classList.add("popup_opened");

    // Задание слушателя нажатия кнопок клавиатуры
    window.addEventListener("keydown", closePopupByEscapeKey);
}


export function showPopupAndCheckValidation(popupElement) {
    const formElement = popupElement.querySelector(validationOptions.formSelector);
    const buttonElement = popupElement.querySelector(validationOptions.submitButtonSelector);

    // Повторная валидация при открытии
    FormValidator.toggleButtonState(validationOptions, formElement, buttonElement);
    showPopup(popupElement);

}


export function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");

    // Удаление слушателя нажатия кнопок клавиатуры
    window.removeEventListener("keydown", closePopupByEscapeKey);
    
}


export function closePopupByEscapeKey(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
}

export function closeProfilePopup() {
    closePopup(profileEditPopup);
}

export function handleEditPopupSubmit(e) {
    e.preventDefault();

    closeProfilePopup();
    
    profileName.textContent = inputEditName.value.trim();
    profileAbout.textContent = inputEditAbout.value.trim();
}

export function closeCardPopup() {
    closePopup(placeAddPopup);
}

export function handleAddPopupSubmit(e) {
    e.preventDefault();

    closeCardPopup();

    renderCard({
        name: inputPlaceAddTitle.value,
        link: inputPlaceAddImageUrl.value
    });

    e.target.reset();
    
}