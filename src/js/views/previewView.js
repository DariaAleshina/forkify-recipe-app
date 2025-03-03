import View from './views_common.js';
import icons from '/src/img/icons.svg';



class PreviewView extends View {
    parentElement = '';

    generateMarkup() {
        const id = window.location.hash.slice(1);
        return `
            <li class="preview">
                <a class="preview__link ${this.data.id === id ? 'preview__link--active' : ''}" href="#${this.data.id}">
                <figure class="preview__fig">
                    <img src="${this.data.image}" alt="Test" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__title">${this.data.title}</h4>
                    <p class="preview__publisher">${this.data.author}</p>
                    <div class="preview__user-generated ${this.data.key ? '' : 'hidden'}">
                        <svg>
                        <use href="${icons}#icon-user"></use>
                        </svg>
                    </div>
                </div>
                </a>
            </li>
        `;
    };
}

export default new PreviewView();