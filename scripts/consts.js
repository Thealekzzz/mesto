import { validationOptions } from "./data.js";

import FormValidator from "./components/FormValidator.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import Api from "./components/Api.js";
import PopupConfirm from "./components/PopupConfirm.js";

import { handleAddPopupSubmit, handleAvatarUpdateSubmit, handleEditPopupSubmit, 
    handleOpenAddPlacePopup, handleOpenAvatarPopup, handleOpenEditPopup } from "./utils/popupUtils.js";

import { createCard } from "./utils/cardUtils.js";

export const profileOpenButton = document.querySelector(".profile__edit-button");
export const placeAddButton = document.querySelector(".profile__add-button");
export const avatarUpdateButton = document.querySelector(".profile__update-avatar");

export const profileEditForm = document.forms["edit-profile-form"];
export const placeAddForm = document.forms["new-place-form"];
export const avatarUpdateForm = document.forms["update-avatar"];

export const editFormValidator = new FormValidator(validationOptions, profileEditForm);
export const addFormValidator = new FormValidator(validationOptions, placeAddForm);
export const avatarUpdateValidator = new FormValidator(validationOptions, avatarUpdateForm);

export const userInfo = new UserInfo({ userNameSelector: ".profile__name", userAboutSelector: ".profile__about", userAvatarSelector: ".profile__avatar" });

export const deletePopup = new PopupConfirm(".popup_type_delete");
export const editPopup = new PopupWithForm(".popup_type_edit", { handleSubmit: handleEditPopupSubmit, handleOpen: handleOpenEditPopup, validator: editFormValidator });
export const addPlacePopup = new PopupWithForm(".popup_type_new-place", { handleSubmit: handleAddPopupSubmit, validator: addFormValidator, handleOpen: handleOpenAddPlacePopup });
export const avatarUpdatePopup = new PopupWithForm(".popup_type_avatar", { handleSubmit: handleAvatarUpdateSubmit, validator: avatarUpdateValidator, handleOpen: handleOpenAvatarPopup })
export const viewPopup = new PopupWithImage(".popup_type_view");

export const cardsSection = new Section({
    renderer: (cardData) => {
        cardsSection.setItem(createCard(cardData));
    }
}, ".cards");

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
    headers: {
        authorization: 'ac0330d2-fd1e-41e2-91b1-03d95834cae1',
        'Content-Type': 'application/json'
    }
});