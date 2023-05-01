import Card from "../components/Card.js";
import { cardsList, viewPopup } from "../consts.js";

function createCard(cardData) {
    const card = new Card(cardData, "#card-template", handleCardClick);
    const cardItem = card.createCard();

    return cardItem;

}

export function renderCard(cardData) {
    const cardItem = createCard(cardData);
    
    cardsList.prepend(cardItem);
}

export function renderCards(cardsData) {
    cardsData.forEach(renderCard);
}

function handleCardClick() {
    viewPopup.open({ link: this._cardData.link, cardName: this._cardData.name} );
}