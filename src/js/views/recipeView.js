import View from './views_common.js';

import icons from '/src/img/icons.svg';
// prev Fractional - to be reistalled with npm
// import { Fraction } from 'fractional';

// new testes Fractional
import fracty from 'fracty';

class RecipeView extends View {
  parentElement = document.querySelector('.recipe');
  errorMessage = 'Recipe was not found 🙁';
  successMsg = 'Success!'

  addHandlerRender(handler) {
    ['load', 'hashchange'].forEach(trigger => window.addEventListener(trigger, handler));
  };

  addHandlerUpdateServings(handler) {
    this.parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--update-servings');
      if (!btn) return;
      const updateTo = +btn.dataset.update;
      if (updateTo <= 0) return;
      handler(updateTo);
    })
  }

  addHandlerAddBookmark(handler) {
    this.parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    })
  }

  generateMarkup() {
    return `
          <figure class="recipe__fig">
            <img src="${this.data.image}" alt="${this.data.title}" class="recipe__img" />
            <h1 class="recipe__title">
              <span>${this.data.title}</span>
            </h1>
          </figure>
      
          <div class="recipe__details">
            <div class="recipe__info info1">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f38e82" class="bi bi-clock" viewBox="0 0 16 16">
                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/>
              </svg>
              <span class="recipe__info-data recipe__info-data--minutes">${this.data.cookingTime}</span>
              <span class="recipe__info-text">minutes</span>
            </div>
            <div class="recipe__info info2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f38e82" class="bi bi-person-plus" viewBox="0 0 16 16">
                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
              </svg>
              <span class="recipe__info-data recipe__info-data--people">${this.data.servings}</span>
              <span class="recipe__info-text">servings</span>
      
              <div class="recipe__info-buttons">
                <button class="btn--tiny btn--update-servings" data-update="${this.data.servings - 1}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                </svg>
                </button>
                <button class="btn--tiny btn--update-servings" data-update="${this.data.servings + 1}">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                </svg>
                </button>
              </div>
            </div>
      
            <div class="recipe__user-generated ${this.data.key ? '' : 'hidden'}">
              <i class="bi bi-person"></i>      
            </div>
            <button class="btn--round btn--bookmark">
                <i class="bi bi-bookmark${this.data.bookmarked ? '-fill' : ''}"></i>
            </button>
          </div>
      
          <div class="recipe__ingredients">
            <h2 class="heading--2">Recipe ingredients</h2>
            <ul class="recipe__ingredient-list">
              ${this.data.ingredients
        .map(ing => `
                  <li class="recipe__ingredient">
                    <div class="recipe__quantity">${ing.quantity ? fracty(ing.quantity) : ''}</div>
                    <div class="recipe__description">
                      <span class="recipe__unit">${ing.unit}</span>
                      ${ing.description}
                    </div>
                  </li>
                `)
        .join(' ')}
            </ul>
          </div>
      
          <div class="recipe__directions">
            <h2 class="heading--2">How to cook it</h2>
            <p class="recipe__directions-text">
              This recipe was carefully designed and tested by
              <span class="recipe__publisher">${this.data.author}</span>. Please check out
              directions at their website.
            </p>
            <a
              class="btn--small recipe__btn"
              href="${this.data.source}"
              target="_blank"
            >
              <span>Directions</span>
              <i class="bi bi-arrow-right-short"></i>
            </a>
          </div>
        `};
}

export default new RecipeView();