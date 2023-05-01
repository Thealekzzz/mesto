import { validationOptions, initialCards } from "./data.js";

import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";

import "../pages/index.css";


const profileOpenButton = document.querySelector(".profile__edit-button");
const placeAddButton = document.querySelector(".profile__add-button");

const profileEditForm = document.forms["edit-profile-form"];
const placeAddForm = document.forms["new-place-form"];

const editFormValidator = new FormValidator(validationOptions, profileEditForm);
const addFormValidator = new FormValidator(validationOptions, placeAddForm);

const userInfo = new UserInfo({ userNameSelector: ".profile__name", userAboutSelector: ".profile__about"});

const editPopup = new PopupWithForm(".popup_type_edit", { handleSubmit: handleEditPopupSubmit, handleOpen: handleOpenEditPopup, validator: editFormValidator });
const addPlacePopup = new PopupWithForm(".popup_type_new-place", { handleSubmit: handleAddPopupSubmit, validator: addFormValidator });
const viewPopup = new PopupWithImage(".popup_type_view");


const cardsSection = new Section({ items: initialCards, renderer: (cardData) => {
    cardsSection.setItem(createCard(cardData));
}}, ".cards");

function createCard(cardData) {
    const card = new Card(cardData, "#card-template", handleCardClick);
    const cardItem = card.createCard();

    return cardItem;
}

function handleCardClick() {
    viewPopup.open({ link: this._cardData.link, cardName: this._cardData.name} );
}

function handleEditPopupSubmit(e, data) {
    e.preventDefault();

    userInfo.setUserInfo(data);

    this.close();
}

function handleAddPopupSubmit(e, data) {
    e.preventDefault();

    cardsSection.setItem(createCard(data));
    
    this.close();    
}

function handleOpenEditPopup() {
    this.fillFormWithData(userInfo.getUserInfo())
}


[editPopup, addPlacePopup, viewPopup].forEach(popup => popup.setEventListeners());
[editFormValidator, addFormValidator].forEach(validator => validator.enableValidation());


// Открытие попапа по нажатию на кнопку edit
profileOpenButton.addEventListener("click", () => editPopup.open()); 

// Открытие попапа по нажатию на кнопку add
placeAddButton.addEventListener("click", () => addPlacePopup.open());


cardsSection.renderItems();