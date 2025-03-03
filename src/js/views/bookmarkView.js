// import { from } from 'core-js/core/array';
import previewView from './previewView.js';
import View from './views_common.js';


class BookmarksView extends View {
    parentElement = document.querySelector('.bookmarks__list');
    errorMessage = 'No bookmarks yet :(';
    successMsg = 'Success! (Bookmarks)';

    addHandlerRender(handler) {
        window.addEventListener('load', handler);
    }

    generateMarkup() {
        return this.data.map(recipe => previewView.render(recipe, false)).join('');
    };
}

export default new BookmarksView();