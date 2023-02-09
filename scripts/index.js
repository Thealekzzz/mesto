const editButton = document.querySelector(".profile__edit-button")
const closeButton = document.querySelector(".popup__close-button")

const popupOverlay = document.querySelector(".popup")
const popup = document.querySelector(".popup__container")

const inputs = document.querySelectorAll(".popup__input")

const profileName = document.querySelector(".profile__name")
const profileAbout = document.querySelector(".profile__about")


// Открытие попапа по нажатию на кнопку edit
editButton.addEventListener("click", () => {
    popupOverlay.classList.add("popup_opened")

    inputs[0].value = profileName.textContent
    inputs[1].value = profileAbout.textContent

})

// Закрытие попапа без сохранения данных по нажатию на кнопку закрыть
closeButton.addEventListener("click", () => {
    popupOverlay.classList.remove("popup_opened")

})

// Закрытие попапа с сохранением данных по нажатию на кнопку сохранить
popup.addEventListener("submit", (e) => {
    e.preventDefault()

    popupOverlay.classList.remove("popup_opened")
    profileName.textContent = inputs[0].value.trim()
    profileAbout.textContent = inputs[1].value.trim()

})
