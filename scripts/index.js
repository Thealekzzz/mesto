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
const addPlacePopup = new PopupWithForm(".popup_type_new-place", { handleSubmit: handleAddPopupSubmit, validator: addFormValidator, handleOpen: handleOpenAddPlacePopup });
const avatarUpdatePopup = new PopupWithForm(".popup_type_avatar", { handleSubmit: handleAvatarUpdateSubmit, validator: avatarUpdateValidator, handleOpen: handleOpenAvatarPopup })
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
    const card = new Card(cardData, "#card-template", handleCardClick, handleCardRemove, handleCardLike, userInfo._id);
    const cardItem = card.createCard();

    return cardItem;
}

function handleCardClick() {
    viewPopup.open({ link: this.getCardData().link, cardName: this.getCardData().name });
}

function handleCardRemove() {
    deletePopup.setHandleSubmit(() => {
        deletePopup.setLoading(true);

        api.removeCard(this.getCardId())
        .then(() => {
            this.deleteCard();

            deletePopup.close();
        })
        .catch((err) => {
            console.log("Ошибка при удалении фотографии");
            console.error(err);
        })
        .finally(() => {
            deletePopup.setLoading(false);
        });
    });

    deletePopup.open();
}

function handleCardLike() {
    const apiFunction = (this.getCardData().likes.some(userLiked => (userLiked._id === userInfo._id)))
    ? api.unlikeCard.bind(api)
    : api.likeCard.bind(api);


    apiFunction(this.getCardId())
    .then(recievedCardData => {
        this.setCardData(recievedCardData);
        this.updateLikesCount();
    })
    .catch((err) => {
        console.log("Ошибка обновления данных о лайке");
        console.error(err);
    })

    this.cardLikeButton.classList.toggle("card__like-button_active");
}

function handleEditPopupSubmit(e) {
    e.preventDefault();
    this.setLoading(true);

    api.patchUserData(this.getInputValues())
    .then(recievedUserData => {
        userInfo.setUserInfo(recievedUserData);
        this.close();
    })
    .catch((err) => {
        console.log("Ошибка при изменении данных пользователя");
        console.error(err);
    })
    .finally(() => {
        this.setLoading(false);
    });

}

function handleAddPopupSubmit(e) {
    e.preventDefault();
    this.setLoading(true);

    api.addCard(this.getInputValues())
    .then(recievedCardData => {
        cardsSection.setItem(createCard(recievedCardData));
        this.close();
    })
    .catch((err) => {
        console.log("Ошибка при добавлении фотографии");
        console.error(err);
    })
    .finally(() => {
        this.setLoading(false);
    });

}

function handleAvatarUpdateSubmit(e) {
    e.preventDefault();
    this.setLoading(true);

    const avatarURL = this.getInputValues().link;

    api.updateAvatar(avatarURL)
    .then(recievedUserData => {
        userInfo.setUserInfo(recievedUserData);
        this.close();
    })
    .catch((err) => {
        console.log("Ошибка при обновлении аватара");
        console.error(err);
    })
    .finally(() => {
        this.setLoading(false);
    });

}

function handleOpenEditPopup() {
    editFormValidator.resetValidation();
    this.fillFormWithData(userInfo.getUserInfo())
}

function handleOpenAddPlacePopup() {
    addFormValidator.resetValidation();

}

function handleOpenAvatarPopup() {
    avatarUpdateValidator.resetValidation();
}


[editPopup, addPlacePopup, viewPopup, deletePopup, avatarUpdatePopup].forEach(popup => popup.setEventListeners());
[editFormValidator, addFormValidator, avatarUpdateValidator].forEach(validator => validator.enableValidation());


// Открытие попапа по нажатию на кнопку edit
profileOpenButton.addEventListener("click", () => editPopup.open());

// Открытие попапа по нажатию на кнопку add
placeAddButton.addEventListener("click", () => addPlacePopup.open());

// Открытие попапа по нажатию на кнопку обновления аватара
avatarUpdateButton.addEventListener("click", () => avatarUpdatePopup.open());


Promise.all([api.getUserData(), api.getInitialCards()])
.then(([recievedUserData, recievedCards]) => {
    userInfo.setUserInfo(recievedUserData);

    recievedCards.reverse();
    cardsSection.updateItems(recievedCards);
    cardsSection.renderItems();
})
.catch(err => {
    console.log("Ошибка при загрузке данных пользователя или фотографий");
    console.error(err);
})
