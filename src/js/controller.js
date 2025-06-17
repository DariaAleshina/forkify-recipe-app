import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { MODAL_CLOSE_SEC } from './config.js';

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchFormView from './views/searchFormView.js';
import searchResultsView from './views/searchResultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';

import 'bootstrap-icons/font/bootstrap-icons.css';

///////////////////////////////////////

if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    // fetch data
    recipeView.renderSpinner();

    // hide bookmark window
    bookmarksView.hide();


    // load recipe data
    await model.loadRecipe(id);

    // render the data
    recipeView.render(model.state.recipe)


    // update results view with marked chosen recipe
    searchResultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

  } catch (err) {
    console.log(`💥 ${err} 💥`);
    recipeView.renderError();
  }


};

const controlSearch = async function () {
  try {
    searchResultsView.renderSpinner();
    // close bookmark window
    bookmarksView.hide();

    const query = searchFormView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    searchResultsView.render(model.getSearchResultsPage());
    // render pagination
    paginationView.render(model.state.search);



  } catch (err) {
    console.log(`💥 ${err} 💥`);
  };
};

const controlPagination = function (goToPage) {
  searchResultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  // update repipe servings
  model.updateServings(newServings);

  // updte the recipe view
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function (newRecipe) {

  try {
    // show loading spinner
    addRecipeView.renderSpinner();
    // upload recipe (API)
    await model.uploadRecipe(newRecipe);


    // render the recipe
    // change ID in the URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks);


    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);

  } catch (err) {
    console.error(`💥 ${err} 💥`);
    addRecipeView.renderError(err.message);
  }

};


const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchFormView.addHandlerSearch(controlSearch);
  paginationView.addHandlerClick(controlPagination);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
