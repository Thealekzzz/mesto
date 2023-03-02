const profileOpenButton = document.querySelector(".profile__edit-button");
const placeAddButton = document.querySelector(".profile__add-button");

const profileEditPopup = document.querySelector(".popup_type_edit");
const profileEditForm = document.forms["edit-profile-form"];

const placeAddPopup = document.querySelector(".popup_type_new-place");
const placeAddForm = document.forms["new-place-form"];

const placeViewPopup = document.querySelector(".popup_type_view");
const placeViewPopupImage = placeViewPopup.querySelector(".popup__image");
const placeViewPopupCaption = placeViewPopup.querySelector(".popup__caption");

const inputEditName = profileEditForm.querySelector(".popup__input_data_name");
const inputEditAbout = profileEditForm.querySelector(".popup__input_data_about");

const inputPlaceAddTitle = placeAddForm.querySelector(".popup__input_data_title");
const inputPlaceAddImageUrl = placeAddForm.querySelector(".popup__input_data_image-url");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const cardsList = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;
const cardTemplateElement = cardTemplate.querySelector(".card-list-item");

const closeButtons = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll(".popup");


function handleEditButtonClick() {
    inputEditName.value = profileName.textContent;
    inputEditAbout.value = profileAbout.textContent;
    
    showPopup(profileEditPopup);
}

function closeProfilePopup() {
    closePopup(profileEditPopup);
}

function handleEditPopupSubmit(e) {
    e.preventDefault();

    closeProfilePopup();
    
    profileName.textContent = inputEditName.value.trim();
    profileAbout.textContent = inputEditAbout.value.trim();
}

function handleAddButtonClick() {
    showPopup(placeAddPopup);

}

function closeCardPopup() {
    closePopup(placeAddPopup);
}

function handleAddPopupSubmit(e) {
    e.preventDefault();

    closeCardPopup();

    renderCard({
        name: inputPlaceAddTitle.value,
        link: inputPlaceAddImageUrl.value
    });

    e.target.reset();
    
}

function handleViewCloseButtonClick() {
    closePopup(placeViewPopup);
}

function showPopup(popupElement) {
    // Открытие попапа
    popupElement.classList.add("popup_opened");

    // Повторная валидация при открытии
    checkPopupValidation(validationOptions, popupElement);

    // Задание слушателя нажатия кнопок клавиатуры
    window.addEventListener("keydown", closePopupByEscapeKey);
}

function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");

    // Удаление слушателя нажатия кнопок клавиатуры
    window.removeEventListener("keydown", closePopupByEscapeKey);
    
}

function toggleLike(e) {
    e.target.classList.toggle("card__like-button_active");
}

function removeCard(e) {
    e.target.closest(".card-list-item").remove();
}

function handleCardClick(cardData) {
    placeViewPopupImage.setAttribute("src", cardData.link);
    placeViewPopupImage.setAttribute("alt", `${cardData.name}, фото.`);
    placeViewPopupCaption.textContent = cardData.name;

    showPopup(placeViewPopup);
}

function createCard(cardData) {
    const cardItem = cardTemplateElement.cloneNode(true);
    const cardImage = cardItem.querySelector(".card__image");

    cardItem.querySelector(".card__caption").textContent = cardData.name;
    cardImage.setAttribute("src", cardData.link);
    cardImage.setAttribute("alt", `${cardData.name}, фото.`);

    cardImage.addEventListener("click", () => handleCardClick(cardData));
    cardItem.querySelector(".card__like-button").addEventListener("click", toggleLike);
    cardItem.querySelector(".card__remove-button").addEventListener("click", removeCard);


    return cardItem;
}

function renderCard(cardData) {
    const cardItem = createCard(cardData);
    
    cardsList.prepend(cardItem);
}

function renderCards(cardsData) {
    cardsData.forEach(renderCard);
}

function closePopupByEscapeKey(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_opened");
        closePopup(openedPopup);
    }
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
