import { handleEditPopupSubmit, handleAddPopupSubmit, handleOpenEditPopup } from "./utils/popupUtils.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";

export const profileOpenButton = document.querySelector(".profile__edit-button");
export const placeAddButton = document.querySelector(".profile__add-button");

export const cardsList = document.querySelector(".cards");

export const userInfo = new UserInfo({ userNameSelector: ".profile__name", userAboutSelector: ".profile__about"});

export const editPopup = new PopupWithForm(".popup_type_edit", handleEditPopupSubmit, handleOpenEditPopup);
export const addPlacePopup = new PopupWithForm(".popup_type_new-place", handleAddPopupSubmit);
export const viewPopup = new PopupWithImage(".popup_type_view");