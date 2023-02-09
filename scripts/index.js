const editButton = document.querySelector(".profile__edit-button")
const closeButton = document.querySelector(".edit-popup__close-button")

const popupOverlay = document.querySelector(".page-overlay")
const popup = document.querySelector(".edit-popup")

const inputs = document.querySelectorAll(".edit-popup__input")

const profileName = document.querySelector(".profile__name")
const profileStatus = document.querySelector(".profile__description")

console.log(inputs)

editButton.addEventListener("click", () => {
    popupOverlay.classList.remove("hidden")

    inputs[0].value = profileName.textContent
    inputs[1].value = profileStatus.textContent

})

closeButton.addEventListener("click", () => {
    popupOverlay.classList.add("hidden")

})

popup.addEventListener("submit", (e) => {
    e.preventDefault()

    popupOverlay.classList.add("hidden")
    profileName.textContent = inputs[0].value
    profileStatus.textContent = inputs[1].value

})
