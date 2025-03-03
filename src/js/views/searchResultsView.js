import View from './views_common.js';
import previewView from './previewView.js';


class SearchResultsView extends View {
    parentElement = document.querySelector('.results');
    errorMessage = 'Recipes not found 🙁 – Try another query';
    successMsg = 'Success! (Search)'

    generateMarkup() {
        return this.data.map(recipe => previewView.render(recipe, false)).join('');
    };
};

export default new SearchResultsView();