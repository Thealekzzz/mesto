const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editPopup = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile-form"];

const addPopup = document.querySelector(".popup_type_new-place");
const addPlaceForm = document.forms["new-place-form"];

const viewPopup = document.querySelector(".popup_type_view");
const viewPopupImage = viewPopup.querySelector(".popup__image");
const viewPopupCaption = viewPopup.querySelector(".popup__caption");

const editInputName = editProfileForm.querySelector(".popup__input_data_name");
const editInputAbout = editProfileForm.querySelector(".popup__input_data_about");

const addInputTitle = addPlaceForm.querySelector(".popup__input_data_title");
const addInputImageUrl = addPlaceForm.querySelector(".popup__input_data_image-url");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const cardsList = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;
const cardTemplateElement = cardTemplate.querySelector(".card-list-item");

const closeButtons = document.querySelectorAll('.popup__close-button');
const popups = document.querySelectorAll(".popup");


const initialCards = [
    {
      name: 'Балаклава',
      link: './images/cards/balaklava.jpg'
    },
    {
      name: 'Мангуп-Кале',
      link: './images/cards/mangup.jpg'
    },
    {
      name: 'Кача',
      link: './images/cards/kacha.jpg'
    },
    {
      name: 'Ягодное',
      link: './images/cards/yagodnoe.jpg'
    },
    {
      name: 'Фиолент, Севастополь',
      link: './images/cards/fiolent.jpg'
    },
    {
      name: 'Форос, Ялта',
      link: './images/cards/foros.jpg'
    }
]; 

const validationOptions = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_invalid',
    errorClass: 'popup__input-error_visible'
  }


function handleEditButtonClick() {
    editInputName.value = profileName.textContent;
    editInputAbout.value = profileAbout.textContent;
    
    showPopup(editPopup);
}

function closeProfilePopup() {
    closePopup(editPopup);
}

function handleEditPopupSubmit(e) {
    e.preventDefault();

    closeProfilePopup();
    
    profileName.textContent = editInputName.value.trim();
    profileAbout.textContent = editInputAbout.value.trim();
}

function handleAddButtonClick() {
    showPopup(addPopup);

}

function closeCardPopup() {
    closePopup(addPopup);
}

function handleAddPopupSubmit(e) {
    e.preventDefault();

    closeCardPopup();

    renderCard({
        name: addInputTitle.value,
        link: addInputImageUrl.value
    });

    e.target.reset();
    
}

function handleViewCloseButtonClick() {
    closePopup(viewPopup);
}

function showPopup(popupElement) {
    // Открытие попапа
    popupElement.classList.add("popup_opened");

    // Повторная валидация при открытии
    checkPopupValidation(validationOptions, popupElement);

    // Задание слушателя нажатия кнопок клавиатуры
    window.addEventListener("keydown", function handleEscPress(evt) {
        if (evt.key === "Escape") {
            closePopup(popupElement);
            window.removeEventListener("keydown", handleEscPress);
        }

    });
}

function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
    
}

function createCard(cardData) {
    const cardItem = cardTemplateElement.cloneNode(true);
    const cardImage = cardItem.querySelector(".card__image");


    function toggleLike(e) {
        e.target.classList.toggle("card__like-button_active");
    }

    function removeCard(e) {
        e.target.closest(".card-list-item").remove();
    }

    function handleCardClick() {
        viewPopupImage.setAttribute("src", cardData.link);
        viewPopupImage.setAttribute("alt", `${cardData.name}, фото.`);
        viewPopupCaption.textContent = cardData.name;

        showPopup(viewPopup);
    }


    cardItem.querySelector(".card__caption").textContent = cardData.name;
    cardImage.setAttribute("src", cardData.link);
    cardImage.setAttribute("alt", `${cardData.name}, фото.`);

    cardImage.addEventListener("click", handleCardClick);
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


// Открытие попапа по нажатию на кнопку edit
editButton.addEventListener("click", handleEditButtonClick);

// Закрытие попапа с сохранением данных по нажатию на кнопку сохранить
editProfileForm.addEventListener("submit", handleEditPopupSubmit);


// Открытие попапа по нажатию на кнопку add
addButton.addEventListener("click", handleAddButtonClick);

// Закрытие попапа с добавлением места по нажатию на кнопку сохранить
addPlaceForm.addEventListener("submit", handleAddPopupSubmit);


// Слушатели на все кнопки закрытия
closeButtons.forEach(closeButton => {
    const popup = closeButton.closest('.popup');

    closeButton.addEventListener('click', () => closePopup(popup));
})

// Слушатели на нажатие overlay попапов
popups.forEach(popup => {
    popup.addEventListener("click", evt => {
        if (evt.target.classList.contains("popup")) {
            closePopup(popup);

        }
    });
});

// Слушатель нажатия Esc для закрытия всех попапов
// window.addEventListener("keydown", evt => {
//     if (evt.key === "Escape") {
//         popups.forEach(popup => closePopup(popup));
//     }
// })



renderCards(initialCards);
enableValidation(validationOptions); 
