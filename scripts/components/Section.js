export default class Section {
    constructor({ items, renderer }, selector) {
        this._items = items;
        this._renderer = renderer;
        // this._selector = selector;
        this._container = document.querySelector(selector);

    }

    renderItems() {
        this._items.forEach(item => this._renderer(item));
    }

    setItem(item) {
        this._container.prepend(item);
    }

    updateItems(items) {
        this._items = items;
    }
}