import { handleEditPopupSubmit, handleAddPopupSubmit, handleOpenEditPopup } from "./utils/popupUtils.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import UserInfo from "./components/UserInfo.js";

export const profileOpenButton = document.querySelector(".profile__edit-button");
export const placeAddButton = document.querySelector(".profile__add-button");

export const profileEditPopup = document.querySelector(".popup_type_edit");
export const profileEditForm = document.forms["edit-profile-form"];

export const placeAddPopup = document.querySelector(".popup_type_new-place");
export const placeAddForm = document.forms["new-place-form"];

export const inputEditName = profileEditForm.querySelector(".popup__input_data_name");
export const inputEditAbout = profileEditForm.querySelector(".popup__input_data_about");

export const inputPlaceAddTitle = placeAddForm.querySelector(".popup__input_data_title");
export const inputPlaceAddImageUrl = placeAddForm.querySelector(".popup__input_data_image-url");

export const profileName = document.querySelector(".profile__name");
export const profileAbout = document.querySelector(".profile__about");

export const cardsList = document.querySelector(".cards");

export const closeButtons = document.querySelectorAll('.popup__close-button');
export const popups = document.querySelectorAll(".popup");

export const placeViewPopup = document.querySelector(".popup_type_view");
export const placeViewPopupImage = placeViewPopup.querySelector(".popup__image");
export const placeViewPopupCaption = placeViewPopup.querySelector(".popup__caption");



export const userInfo = new UserInfo({ userNameSelector: ".profile__name", userAboutSelector: ".profile__about"});

export const editPopup = new PopupWithForm(".popup_type_edit", handleEditPopupSubmit, handleOpenEditPopup);
export const addPlacePopup = new PopupWithForm(".popup_type_new-place", handleAddPopupSubmit);
export const viewPopup = new PopupWithImage(".popup_type_view");