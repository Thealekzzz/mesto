import { renderCard } from "./cardUtils.js";
import { editPopup, addPlacePopup, userInfo } from "../consts.js";


export function handleEditPopupSubmit(e) {
    e.preventDefault();

    userInfo.setUserInfo(editPopup.getInputValues());

    this.close();
}

export function handleAddPopupSubmit(e) {
    e.preventDefault();

    renderCard(addPlacePopup.getInputValues());
    
    this.close();    
}

export function handleOpenEditPopup() {
    this.fillFormWithData(userInfo.getUserInfo())
}