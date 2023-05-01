import { initialCards } from "./data.js";
import { renderCards } from "./utils/cardUtils.js";
import { profileOpenButton, placeAddButton } from "./consts.js";
import { addPlacePopup, editPopup, viewPopup } from "./consts.js";

import "../pages/index.css";


[editPopup, addPlacePopup, viewPopup].forEach(popupObject => {
    popupObject.setEventListeners();
})


// Открытие попапа по нажатию на кнопку edit
profileOpenButton.addEventListener("click", () => editPopup.open()); 

// Открытие попапа по нажатию на кнопку add
placeAddButton.addEventListener("click", () => addPlacePopup.open());


renderCards(initialCards);

