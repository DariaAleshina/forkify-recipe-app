// import { from } from 'core-js/core/array';
import previewView from './previewView.js';
import View from './views_common.js';


class BookmarksView extends View {
    parentElement = document.querySelector('.bookmarks__list');
    errorMessage = 'No bookmarks yet :(';
    successMsg = 'Success! (Bookmarks)';

    bookmarkWindow = document.querySelector('.bookmarks');
    bntOpenBookmarks = document.querySelector('.nav__btn--bookmarks');

    constructor() {
        super();
        this._handleNavBtn();
    }


    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    generateMarkup() {
        return this.data.map(recipe => previewView.render(recipe, false)).join('');
    };

    toggleWindow() {
        this.bookmarkWindow.classList.toggle('hidden');
    }

    hide() {
        this.bookmarkWindow.classList.add('hidden');
    }

    _handleNavBtn() {
        this.bntOpenBookmarks.addEventListener('click', this.toggleWindow.bind(this));
    }


}

export default new BookmarksView();