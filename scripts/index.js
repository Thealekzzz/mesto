import { validationOptions } from "./data.js";

import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import UserInfo from "./components/UserInfo.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import Api from "./components/Api.js";

import "../pages/index.css";
import PopupConfirm from "./components/PopupConfirm.js";


const profileOpenButton = document.querySelector(".profile__edit-button");
const placeAddButton = document.querySelector(".profile__add-button");
const avatarUpdateButton = document.querySelector(".profile__update-avatar");

const profileEditForm = document.forms["edit-profile-form"];
const placeAddForm = document.forms["new-place-form"];
const avatarUpdateForm = document.forms["update-avatar"];

const editFormValidator = new FormValidator(validationOptions, profileEditForm);
const addFormValidator = new FormValidator(validationOptions, placeAddForm);
const avatarUpdateValidator = new FormValidator(validationOptions, avatarUpdateForm);

export const userInfo = new UserInfo({ userNameSelector: ".profile__name", userAboutSelector: ".profile__about", userAvatarSelector: ".profile__avatar" });

export const deletePopup = new PopupConfirm(".popup_type_delete");
const editPopup = new PopupWithForm(".popup_type_edit", { handleSubmit: handleEditPopupSubmit, handleOpen: handleOpenEditPopup, validator: editFormValidator });
const addPlacePopup = new PopupWithForm(".popup_type_new-place", { handleSubmit: handleAddPopupSubmit, validator: addFormValidator });
const avatarUpdatePopup = new PopupWithForm(".popup_type_avatar", { handleSubmit: handleAvatarUpdateSubmit, validator: avatarUpdateValidator })
const viewPopup = new PopupWithImage(".popup_type_view");

const cardsSection = new Section({
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


function createCard(cardData) {
    const card = new Card(cardData, "#card-template", handleCardClick, handleCardRemove);
    const cardItem = card.createCard();

    return cardItem;
}

function handleCardClick() {
    viewPopup.open({ link: this._cardData.link, cardName: this._cardData.name });
}

function handleCardRemove() {
    deletePopup.setHandleSubmit(() => {
        deletePopup.setLoading(true);

        api.removeCard(this._cardData._id)
        .then(() => {
            this._cardElement.remove();
            this._cardElement = null;

            deletePopup.setLoading(false);
            deletePopup.close();
        })
    });

    deletePopup.open();
}

function handleEditPopupSubmit(e) {
    e.preventDefault();
    this.setLoading(true);

    api.patchUserData(this._getInputValues())
    .then(userData => {
        userInfo.setUserInfo(userData);
        this.close();
    })
    .catch(console.error);

}

function handleAddPopupSubmit(e) {
    e.preventDefault();
    this.setLoading(true);

    api.addCard(this._getInputValues())
    .then(cardData => {
        cardsSection.setItem(createCard(cardData));
        this.close();
    })
    .catch(console.error);

}

function handleAvatarUpdateSubmit(e) {
    e.preventDefault();
    this.setLoading(true);

    const avatarURL = this._getInputValues().link;

    api.updateAvatar(avatarURL)
    .then(data => {
        userInfo.setUserInfo(data);
        this.close();
    })
    .catch(console.error);

}

function handleOpenEditPopup() {
    this.fillFormWithData(userInfo.getUserInfo())
}


[editPopup, addPlacePopup, viewPopup, deletePopup, avatarUpdatePopup].forEach(popup => popup.setEventListeners());
[editFormValidator, addFormValidator, avatarUpdateValidator].forEach(validator => validator.enableValidation());


// Открытие попапа по нажатию на кнопку edit
profileOpenButton.addEventListener("click", () => editPopup.open());

// Открытие попапа по нажатию на кнопку add
placeAddButton.addEventListener("click", () => addPlacePopup.open());

// Открытие попапа по нажатию на кнопку обновления аватара
avatarUpdateButton.addEventListener("click", () => avatarUpdatePopup.open());


api.getUserData()
.then(userData => {
    userInfo.setUserInfo(userData);
})

api.getInitialCards()
.then(cards => {
    cards.reverse();
    cardsSection.updateItems(cards);
    cardsSection.renderItems();
})

