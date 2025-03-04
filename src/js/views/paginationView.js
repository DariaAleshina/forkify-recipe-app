import View from './views_common.js';
import icons from '/src/img/icons.svg';

class PaginationView extends View {
    parentElement = document.querySelector('.pagination');
    errorMessage = '';
    successMsg = '';

    addHandlerClick(handler) {
        this.parentElement.addEventListener('click', function (event) {
            const btn = event.target.closest('.btn--inline');
            if (!btn) return;
            const goToPage = +btn.dataset.goto;
            handler(goToPage);
        })
    };

    generateMarkup() {
        const numPages = Math.ceil(this.data.results.length / this.data.resultsPerPage);

        // page 1 & there are other pages
        if (this.data.page === 1 && numPages > 1) {
            return `
                <button data-goto="${this.data.page + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${this.data.page + 1}</span>
                    <i class="bi bi-arrow-right-short"></i>
                </button>
            `;
        };

        // last page
        if (numPages > 1 && this.data.page === numPages) {
            return `
                <button data-goto="${this.data.page - 1}" class="btn--inline pagination__btn--prev">
                    <i class="bi bi-arrow-left-short"></i>
                    <span>Page ${this.data.page - 1}</span>
                </button>
            `;
        };

        // pages in between
        if (this.data.page < numPages) {
            return `
                <button data-goto="${this.data.page + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${this.data.page + 1}</span>
                    <i class="bi bi-arrow-right-short"></i>
                </button>
                <button data-goto="${this.data.page - 1}" class="btn--inline pagination__btn--prev">
                    <i class="bi bi-arrow-left-short"></i>
                    <span>Page ${this.data.page - 1}</span>
                </button>
            `;
        }

        // page 1 & only
        return '';

    };
};

export default new PaginationView();    