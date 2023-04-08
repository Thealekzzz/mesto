import Card from "../Card.js";
import { cardsList } from "../consts.js";

export function renderCard(cardData) {
    const card = new Card(cardData, "#card-template");
    const cardItem = card.createCard();
    
    cardsList.prepend(cardItem);
}

export function renderCards(cardsData) {
    cardsData.forEach(renderCard);
}