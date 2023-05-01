import p1 from "../images/cards/balaklava.jpg";
import p2 from "../images/cards/mangup.jpg";
import p3 from "../images/cards/kacha.jpg";
import p4 from "../images/cards/yagodnoe.jpg";
import p5 from "../images/cards/fiolent.jpg";
import p6 from "../images/cards/foros.jpg";

export const initialCards = [
  {
    name: 'Балаклава',
    link: p1
  },
  {
    name: 'Мангуп-Кале',
    link: p2
  },
  {
    name: 'Кача',
    link: p3
  },
  {
    name: 'Ягодное',
    link: p4
  },
  {
    name: 'Фиолент, Севастополь',
    link: p5
  },
  {
    name: 'Форос, Ялта',
    link: p6
  }
]; 

export const validationOptions = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__input-error_visible'
}