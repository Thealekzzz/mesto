const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editPopupOverlay = document.querySelector(".popup_type_edit");
const editProfileForm = document.forms["edit-profile-form"];

const addPopupOverlay = document.querySelector(".popup_type_new-place");
const addPlaceForm = document.forms["new-place-form"];

const viewPopupOverlay = document.querySelector(".popup_type_view");
const viewPopupImage = viewPopupOverlay.querySelector(".popup__image");
const viewPopupCaption = viewPopupOverlay.querySelector(".popup__caption");

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


function handleEditButtonClick() {
    showPopup(editPopupOverlay);

    editInputName.value = profileName.textContent;
    editInputAbout.value = profileAbout.textContent;
}

function handleEditCloseButtonClick() {
    closePopup(editPopupOverlay);
}

function handleEditPopupSubmit(e) {
    e.preventDefault();

    handleEditCloseButtonClick();
    
    profileName.textContent = editInputName.value.trim();
    profileAbout.textContent = editInputAbout.value.trim();
}

function handleAddButtonClick() {
    showPopup(addPopupOverlay);

}

function handleAddCloseButtonClick() {
    closePopup(addPopupOverlay);
}

function handleAddPopupSubmit(e) {
    e.preventDefault();

    handleAddCloseButtonClick();

    renderCard({
        name: addInputTitle.value,
        link: addInputImageUrl.value
    });

    e.target.reset();
    
}

function handleCardClick() {
    showPopup(viewPopupOverlay);
}

function handleViewCloseButtonClick() {
    closePopup(viewPopupOverlay);
}

function showPopup(popupElement) {
    popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
}

function createCard(cardData) {
    const cardItem = cardTemplateElement.cloneNode(true);
    const cardImage = cardItem.querySelector(".card__image");


    function toggleLike(e) {
        e.stopPropagation();
        e.target.classList.toggle("card__like-button_active");
    }

    function removeCard(e) {
        e.stopPropagation();
        e.target.closest(".card-list-item").remove();
    }

    function handleCardClick() {
        viewPopupImage.setAttribute("src", cardData.link);
        viewPopupImage.setAttribute("alt", `${cardData.name}, фото.`);
        viewPopupCaption.textContent = cardData.name;

        showPopup(viewPopupOverlay);
    }


    cardItem.querySelector(".card__caption").textContent = cardData.name;
    cardImage.setAttribute("src", cardData.link);
    cardImage.setAttribute("alt", `${cardData.name}, фото.`);

    cardItem.addEventListener("click", handleCardClick);
    cardItem.querySelector(".card__like-button").addEventListener("click", toggleLike);
    cardItem.querySelector(".card__remove-button").addEventListener("click", removeCard);


    return cardItem;
}

function renderCard(cardData) {
    let cardItem = createCard(cardData);
    
    cardsList.prepend(cardItem);
}

function renderCards(cardsData) {
    cardsData.forEach(renderCard);
}


// Открытие попапа по нажатию на кнопку edit
editButton.addEventListener("click", handleEditButtonClick)

// Закрытие попапа с сохранением данных по нажатию на кнопку сохранить
editProfileForm.addEventListener("submit", handleEditPopupSubmit)


// Открытие попапа по нажатию на кнопку add
addButton.addEventListener("click", handleAddButtonClick)

// Закрытие попапа с добавлением места по нажатию на кнопку сохранить
addPlaceForm.addEventListener("submit", handleAddPopupSubmit)


// Слушатели на все кнопки закрытия
closeButtons.forEach(closeButton => {
    const popup = closeButton.closest('.popup');

    closeButton.addEventListener('click', () => closePopup(popup));
})


renderCards(initialCards);

