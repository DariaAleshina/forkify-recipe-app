import icons from 'url:../../img/icons.svg';

export default class View {
    data;

    /**
     * Render received data object to the DOM
     * @param {Object | Object[]} data the data to be rendered (recipe, search results, etc)
     * @param {boolean} [render=true] if false, create markup string (to be reused in other render function)
     * @returns {undefined | string} markup string is returned if false
     * @author Daria Aleshina
     */

    render(data, render = true) {
        if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

        this.data = data;
        const markup = this.generateMarkup();

        if (render === false) return markup;

        this.clear();
        this.parentElement.insertAdjacentHTML('beforeend', markup);
    };

    update(data) {

        this.data = data;
        const newMarkup = this.generateMarkup();

        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*'));
        const currentElements = Array.from(this.parentElement.querySelectorAll('*'));

        newElements.forEach((newEl, i) => {
            const curEl = currentElements[i];

            // change visible text elements on page
            if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
                curEl.textContent = newEl.textContent;
            };

            // updating dataset attributes
            if (!newEl.isEqualNode(curEl)) {
                Array.from(newEl.attributes).forEach(attr => curEl.setAttribute(attr.name, attr.value));
            }
        })
    }

    clear() {
        this.parentElement.innerHTML = '';
    };

    renderSpinner = function () {
        const markup = `
        <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
      `;
        this.clear();
        this.parentElement.insertAdjacentHTML('beforeend', markup);
    };

    renderError(message = this.errorMessage) {
        const markup = `
            <div class="error">
                <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
      `;
        this.clear();
        this.parentElement.insertAdjacentHTML('beforeend', markup);
    };

    renderMessage(message = this.successMsg) {
        const markup = `
            <div class="message">
                <div>
                <svg>
                    <use href="${icons}#icon-smile"></use>
                </svg>
                </div>
                <p>${message}</p>
            </div>
      `;
        this.clear();
        this.parentElement.insertAdjacentHTML('beforeend', markup);
    };


};
