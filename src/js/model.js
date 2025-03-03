import { getPrototypeOf } from 'core-js/./es/object';
import { KEY, API_URL, SEARCH_RESULTS_PER_PAGE } from './config.js';
import { AJAX } from './helpers.js';
import { isGeneratorFunction } from 'regenerator-runtime';


export const state = {
    recipe: {},
    search: {
        query: '',
        results: [],
        resultsPerPage: SEARCH_RESULTS_PER_PAGE,
        page: 1,
    },
    bookmarks: [],
};

const formatRecipeObject = function (data) {
    const { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        author: recipe.publisher,
        cookingTime: recipe.cooking_time,
        servings: recipe.servings,
        ingredients: recipe.ingredients,
        image: recipe.image_url,
        source: recipe.source_url,
        ...(recipe.key && { key: recipe.key }),
    }
}

export const loadRecipe = async function (id) {
    try {
        const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
        state.recipe = formatRecipeObject(data);

        if (state.bookmarks.some(recipe => recipe.id === id)) state.recipe.bookmarked = true;
        else state.recipe.bookmarked = false;

    } catch (err) {
        throw err;
    }
};

export const loadSearchResults = async function (query) {
    try {
        const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

        state.search.query = query;
        state.search.results = data.data.recipes.map(recipe => {
            return {
                id: recipe.id,
                title: recipe.title,
                author: recipe.publisher,
                image: recipe.image_url,
                ...(recipe.key && { key: recipe.key }),
            };
        })

        // re-set pagination 
        state.search.page = 1;
    } catch (err) {
        throw err;
    };
};

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;
    const start = state.search.resultsPerPage * (page - 1);
    const end = state.search.resultsPerPage * page;
    return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
    state.recipe.ingredients.forEach(ingredient => {
        ingredient.quantity = (ingredient.quantity * newServings) / state.recipe.servings;
    });

    state.recipe.servings = newServings;
};

const persistBookmarks = function () {
    localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}

export const addBookmark = function (recipe) {
    // add bookmark to the state
    state.bookmarks.push(recipe);

    // mark current recipe as bookmarked
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookmarks();
};

export const deleteBookmark = function (id) {
    const index = state.bookmarks.findIndex(el => el.id === id);
    state.bookmarks.splice(index, 1);

    // mark current recipe as NOT bookmarked
    if (id === state.recipe.id) state.recipe.bookmarked = false;
    persistBookmarks();
}

export const clearBookmarks = function () {
    localStorage.clear('bookmarks');
}

export const uploadRecipe = async function (newRecipe) {
    try {
        const ingredients = Object
            .entries(newRecipe)
            .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
            .map(ing => {
                const ingArr = ing[1].split(',').map(el => el.trim());
                if (ingArr.length !== 3) throw new Error('Failed to upload the recipe due to wrong ingredient format');
                const [quantity, unit, description] = ingArr;
                return { quantity: quantity ? +quantity : null, unit, description }
            });
        console.log(newRecipe, ingredients);

        const recipeToUpload = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image,
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            ingredients,
        }
        console.log('recipeToUpload', recipeToUpload);
        const data = await AJAX(`${API_URL}?key=${KEY}`, recipeToUpload);
        console.log(data);
        state.recipe = formatRecipeObject(data);
        addBookmark(state.recipe);
    } catch (err) {
        throw err;
    }
}

const init = function () {
    // clearBookmarks();
    const storage = localStorage.getItem('bookmarks');
    if (storage) state.bookmarks = JSON.parse(storage);
};

init();

