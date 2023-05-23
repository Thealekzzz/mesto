import { profileOpenButton, placeAddButton, avatarUpdateButton, editFormValidator, addFormValidator, avatarUpdateValidator, 
    userInfo, deletePopup, editPopup, addPlacePopup, avatarUpdatePopup, viewPopup, cardsSection, api } from "./consts.js";

import "../pages/index.css";


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
