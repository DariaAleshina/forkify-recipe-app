import View from './views_common.js';
import icons from 'url:../../img/icons.svg';


class AddRecipeView extends View {
    parentElement = document.querySelector('.upload');
    errorMessage = 'Smth went wrong, while uploading the recipe. Try again 🙁';
    successMsg = 'New Recipe was successfully uploaded!'

    window = document.querySelector('.add-recipe-window');
    overlay = document.querySelector('.overlay');
    btnOpenForm = document.querySelector('.nav__btn--add-recipe');
    btnCloseForm = document.querySelector('.btn--close-modal');

    constructor() {
        super();
        this._addHandlerShowAddRecipeForm();
        this._addHandlerHideAddRecipeForm();
    }


    toggleWindow() {
        this.overlay.classList.toggle('hidden');
        this.window.classList.toggle('hidden');
    }

    _addHandlerShowAddRecipeForm() {
        this.btnOpenForm.addEventListener('click', this.toggleWindow.bind(this));
    };

    _addHandlerHideAddRecipeForm() {
        this.btnCloseForm.addEventListener('click', this.toggleWindow.bind(this));
        this.overlay.addEventListener('click', this.toggleWindow.bind(this));
    }

    addHandlerUpload(handler) {
        this.parentElement.addEventListener('submit', function (event) {
            event.preventDefault();
            const dataArr = [...new FormData(this)];
            const data = Object.fromEntries(dataArr);
            handler(data);
        });
    }

    generateMarkup() {
    };
};

export default new AddRecipeView();