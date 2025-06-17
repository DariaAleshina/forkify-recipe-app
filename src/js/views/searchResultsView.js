import View from './views_common.js';
import previewView from './previewView.js';
const mobileScreen = window.matchMedia('(max-width: 600px)');


class SearchResultsView extends View {
    parentElement = document.querySelector('.results');
    searchResultsWindow = document.querySelector('.search-results');
    btnClose = document.querySelector('.btn--close-search');


    errorMessage = 'Recipes not found 🙁 – Try another query';
    successMsg = 'Success! (Search)';

    constructor() {
        super();
        this._handleMobileScreenHide();
    }


    generateMarkup() {
        return this.data.map(recipe => previewView.render(recipe, false)).join('');
    };

    hideOnMobile() {
        if (!mobileScreen.matches) return;
        this.searchResultsWindow.classList.add('hidden');
    }

    showOnMobile() {
        if (!mobileScreen.matches) return;
        this.searchResultsWindow.classList.remove('hidden');
    }

    _handleMobileScreenHide() {
        console.log('mobileScreen? ', mobileScreen.matches);
        this.hideOnMobile();
        this.btnClose?.addEventListener('click', this.hideOnMobile.bind(this));
    }
};

export default new SearchResultsView();