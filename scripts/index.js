const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editPopupOverlay = document.querySelector(".popup_type_edit");
const editPopup = document.querySelector(".popup__form_type_edit");
const editCloseButton = document.querySelector(".popup__close-button_type_edit");

const addPopupOverlay = document.querySelector(".popup_type_new-place");
const addPopup = document.querySelector(".popup__form_type_new-place");
const addCloseButton = document.querySelector(".popup__close-button_type_new-place");

const viewPopupOverlay = document.querySelector(".popup_type_view");
const viewCloseButton = document.querySelector(".popup__close-button_type_view");

const editInputName = editPopup.querySelector(".popup__input_data_name");
const editInputAbout = editPopup.querySelector(".popup__input_data_about");

const addInputTitle = addPopup.querySelector(".popup__input_data_title");
const addInputImageUrl = addPopup.querySelector(".popup__input_data_image-url");

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

const cardsList = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content;


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


function onEditButtonClick() {
    showPopup(editPopupOverlay);

    editInputName.value = profileName.textContent;
    editInputAbout.value = profileAbout.textContent;
}

function onEditCloseButtonClick() {
    closePopup(editPopupOverlay);
}

function onEditPopupSubmit(e) {
    e.preventDefault();

    onEditCloseButtonClick();
    
    profileName.textContent = editInputName.value.trim();
    profileAbout.textContent = editInputAbout.value.trim();
}

function onAddButtonClick() {
    showPopup(addPopupOverlay);

}

function onAddCloseButtonClick() {
    closePopup(addPopupOverlay);
}

function onAddPopupSubmit(e) {
    e.preventDefault();

    onAddCloseButtonClick();

    renderCard({
        name: addInputTitle.value,
        link: addInputImageUrl.value
    });

    addInputTitle.value = "";
    addInputImageUrl.value = "";
    
}

function onCardClick() {
    showPopup(viewPopupOverlay);
}

function onViewCloseButtonClick() {
    closePopup(viewPopupOverlay);
}

function showPopup(popupElement) {
    popupElement.classList.add("popup_opened");
}

function closePopup(popupElement) {
    popupElement.classList.remove("popup_opened");
}

function renderCard(cardData) {
    const cardItem = cardTemplate.querySelector(".card-list-item").cloneNode(true);
    const cardImage = cardItem.querySelector(".card__image");


    function likeButtonClicked(e) {
        e.stopPropagation();
        e.target.classList.toggle("card__like-button_active");
    }

    function removeButtonClicked(e) {
        e.stopPropagation();
        e.target.closest(".card-list-item").remove();
    }

    function onCardClicked(e) {
        const viewPopupImage = viewPopupOverlay.querySelector(".popup__image");

        viewPopupImage.setAttribute("src", cardData.link);
        viewPopupImage.setAttribute("alt", `${cardData.name}, фото.`);
        viewPopupOverlay.querySelector(".popup__caption").textContent = cardData.name;

        showPopup(viewPopupOverlay);
    }


    cardItem.querySelector(".card__caption").textContent = cardData.name;
    cardImage.setAttribute("src", cardData.link);
    cardImage.setAttribute("alt", `${cardData.name}, фото.`);

    cardItem.addEventListener("click", onCardClicked);
    cardItem.querySelector(".card__like-button").addEventListener("click", likeButtonClicked);
    cardItem.querySelector(".card__remove-button").addEventListener("click", removeButtonClicked);

    cardsList.insertAdjacentElement("afterbegin", cardItem);
}

function renderCards(cardsData) {
    cardsData.forEach(cardData => {
        renderCard(cardData);
    });
}


// Открытие попапа по нажатию на кнопку edit
editButton.addEventListener("click", onEditButtonClick)

// Закрытие попапа без сохранения данных по нажатию на кнопку закрыть
editCloseButton.addEventListener("click", onEditCloseButtonClick)

// Закрытие попапа с сохранением данных по нажатию на кнопку сохранить
editPopup.addEventListener("submit", onEditPopupSubmit)


// Открытие попапа по нажатию на кнопку add
addButton.addEventListener("click", onAddButtonClick)

// Закрытие попапа без добавления места по нажатию на кнопку закрыть
addCloseButton.addEventListener("click", onAddCloseButtonClick)

// Закрытие попапа с добавлением места по нажатию на кнопку сохранить
addPopup.addEventListener("submit", onAddPopupSubmit)


// Закрытие попапа просмотра фото
viewCloseButton.addEventListener("click", onViewCloseButtonClick)


renderCards(initialCards);
