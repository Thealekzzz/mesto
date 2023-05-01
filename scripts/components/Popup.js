export default class Popup {
    constructor(selector) {
        this._popupElement = document.querySelector(selector);
        this._closeButtonElement = this._popupElement.querySelector(".popup__close-button");
        
    }

    open() {
        this._popupElement.classList.add("popup_opened");
    
        // Задание слушателя нажатия кнопок клавиатуры
        window.addEventListener("keydown", this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove("popup_opened");
    
        // Удаление слушателя нажатия кнопок клавиатуры
        window.removeEventListener("keydown", this._handleEscClose);
        
    }

    setEventListeners() {
        this._closeButtonElement.addEventListener('click', () => this.close());

        this._popupElement.addEventListener("mousedown", evt => {
            if (evt.target.classList.contains("popup")) {
                this.close();
    
            }
        });
    }

    _handleEscClose = e => {
        console.log(this, e)
        if (e.key === "Escape") {
            this.close();
        }
    }
}