import { initialCards, validationOptions } from "./data.js";
import { enableValidation } from "./utils/validationUtils.js";
import { closePopup, handleEditPopupSubmit, handleAddPopupSubmit, showPopupAndCheckValidation } from "./utils/popupUtils.js";
import { renderCards } from "./utils/cardUtils.js";
import { profileOpenButton, placeAddButton, profileEditPopup, profileEditForm, 
    placeAddPopup, placeAddForm, inputEditName, inputEditAbout, profileName, 
    profileAbout, closeButtons, popups } from "./consts.js";


function handleEditButtonClick() {
    inputEditName.value = profileName.textContent;
    inputEditAbout.value = profileAbout.textContent;
    
    showPopupAndCheckValidation(profileEditPopup);
}

function handleAddButtonClick() {
    showPopupAndCheckValidation(placeAddPopup);

}

// Открытие попапа по нажатию на кнопку edit
profileOpenButton.addEventListener("click", handleEditButtonClick);

// Закрытие попапа с сохранением данных по нажатию на кнопку сохранить
profileEditForm.addEventListener("submit", handleEditPopupSubmit);


// Открытие попапа по нажатию на кнопку add
placeAddButton.addEventListener("click", handleAddButtonClick);

// Закрытие попапа с добавлением места по нажатию на кнопку сохранить
placeAddForm.addEventListener("submit", handleAddPopupSubmit);


// Слушатели на все кнопки закрытия
closeButtons.forEach(closeButton => {
    const popup = closeButton.closest('.popup');

    closeButton.addEventListener('click', () => closePopup(popup));
})

// Слушатели на нажатие overlay попапов
popups.forEach(popup => {
    popup.addEventListener("mousedown", evt => {
        if (evt.target.classList.contains("popup")) {
            closePopup(popup);

        }
    });
});


renderCards(initialCards);
enableValidation(validationOptions); 
