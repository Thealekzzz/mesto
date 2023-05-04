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
    link: "https://sun9-26.userapi.com/impf/c845218/v845218046/d27ec/15xKUnwEvuw.jpg?size=2560x1440&quality=96&sign=2ba9ec4d9c11d966e20963a17bfee862&type=album"
  },
  {
    name: 'Кача',
    link: p3
  },
  {
    name: 'Ягодное',
    link: "https://sun9-63.userapi.com/impf/c845420/v845420048/1fa772/jz2Wh_VRhGM.jpg?size=1728x2160&quality=96&sign=4e63b6ade82661e9b8988348b631ffb9&type=album"
  },
  {
    name: 'Фиолент, Севастополь',
    link: "https://sun9-73.userapi.com/impg/ugPc3z1SBc-aE1hyldbVSZuEnxoC4YaR24zCIg/N8rbJvLLy9Q.jpg?size=2340x1560&quality=96&sign=1498608e77961901ae13f90573f3779b&type=album"
  },
  {
    name: 'Форос, Ялта',
    link: "https://sun9-32.userapi.com/impf/c824604/v824604756/13d83a/zRCEyVelzWE.jpg?size=1477x2160&quality=96&sign=b8e9819bb3d65897db3a87664a8a2135&type=album"
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