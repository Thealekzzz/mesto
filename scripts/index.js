const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");

const popupOverlay = document.querySelector(".popup");
const popup = document.querySelector(".popup__form");

const inputName = document.querySelector(".popup__input_data_name");
const inputAbout = document.querySelector(".popup__input_data_about");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");


function onEditButtonClick() {
    popupOverlay.classList.add("popup_opened");

    inputName.value = profileName.textContent;
    inputAbout.value = profileAbout.textContent;
}

function onCloseButtonClick() {
    popupOverlay.classList.remove("popup_opened");
}

function onPopupSubmit(e) {
    e.preventDefault();

    onCloseButtonClick()
    
    profileName.textContent = inputName.value.trim();
    profileAbout.textContent = inputAbout.value.trim();
}


// Открытие попапа по нажатию на кнопку edit
editButton.addEventListener("click", onEditButtonClick)

// Закрытие попапа без сохранения данных по нажатию на кнопку закрыть
closeButton.addEventListener("click", onCloseButtonClick)

// Закрытие попапа с сохранением данных по нажатию на кнопку сохранить
popup.addEventListener("submit", onPopupSubmit)
