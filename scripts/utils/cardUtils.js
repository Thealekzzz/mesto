import Card from "../Card.js";
import { cardsList } from "../consts.js";

function createCard(cardData) {
    const card = new Card(cardData, "#card-template");
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