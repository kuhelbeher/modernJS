// Instances of classes
const ui = new UI(),
			cocktail = new CocktailAPI(),
			cocktailDB = new CocktailDB();


// Event listeners
function eventListeners() {
	document.addEventListener('DOMContentLoaded', documentReady);

	const searchForm = document.querySelector('#search-form');
	if (searchForm) {
		searchForm.addEventListener('submit', getCocktails);
	}

	// the results listeners
	const resultsDiv = document.querySelector('#results');
	if (resultsDiv) {
		resultsDiv.addEventListener('click', resultsDelegation);
	}
}

eventListeners();

function getCocktails(e) {
	e.preventDefault();
	
	const searchTerm = document.querySelector('#search').value;
	
	if (searchTerm === '') {
		ui.printMessage('Please add something into the form', 'danger');
	} else {
		let serverResponse;

		const type = document.querySelector('#type').value;

		// evaluate the type of method

		switch (type) {
			case 'name':
				serverResponse = cocktail.getDrinksByName(searchTerm);
				break;
			case 'ingredient':
				serverResponse = cocktail.getDrinksByIngredient(searchTerm);
				break;
			case 'category':
				serverResponse = cocktail.getDrinksByCategory(searchTerm);
				break;
			case 'alcohol':
				serverResponse = cocktail.getDrinksByAlcohol(searchTerm);
				break;
		}

		ui.clearResults();

		// query by the name of the drink
		serverResponse.then(cocktails => {
			if (cocktails.cocktails.drinks === null) {
				ui.printMessage('There\'re no results, try a different term', 'danger');
			} else {
				if (type === 'name') {
					ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
				} else {
					// Display without ingredients (category, alcohol, ingredient)
					ui.displayDrinks(cocktails.cocktails.drinks);
				}
			}
		});
	}
}

// delegation for the results area
function resultsDelegation(e) {
	e.preventDefault();

	if (e.target.classList.contains('get-recipe')) {
		cocktail.getSingleRecipe(e.target.dataset.id)
			.then(recipe => {
				// displays single recipe into a modal
				ui.displaySingle(recipe.recipe.drinks[0]);
			});
	}

	// when favorite btn is clicked
	if (e.target.classList.contains('favorite-btn')) {
		if (e.target.classList.contains('is-favorite')) {
			e.target.classList.remove('is-favorite');
			e.target.textContent = '+';

			// remove from the storage
			cocktailDB.removeFromDB(e.target.dataset.id);
		} else {
			e.target.classList.add('is-favorite');
			e.target.textContent = '-';

			// get info
			const cardBody = e.target.parentElement;

			const drinkInfo = {
				id: e.target.dataset.id,
				name: cardBody.querySelector('.card-title').textContent,
				image: cardBody.querySelector('.card-img-top').src
			}
			// add itno the storage
			cocktailDB.saveIntoDB(drinkInfo);
		}
	}
}

// document Ready
function documentReady() {
	// displays on load the favorites from the storage
	ui.isFavorite();

	const searchCategory = document.querySelector('.search-category');

	if (searchCategory) {
		ui.displayCategories();
	}

	// when favorites page
	const favoritesTable = document.querySelector('#favorites');

	if(favoritesTable) {
		const drinks = cocktailDB.getFromDB();
		ui.displayFavorites(drinks);

		// when view or delete are clicked
		favoritesTable.addEventListener('click', (e) => {
			e.preventDefault();

			if (e.target.classList.contains('get-recipe')) {
				cocktail.getSingleRecipe(e.target.dataset.id)
					.then(recipe => {
						// displays single recipe into a modal
						ui.displaySingle(recipe.recipe.drinks[0]);
					});
			}

			// when remove btn is clicked
			if (e.target.classList.contains('remove-recipe')) {
				// remove from DOM
				ui.removeFavorite(e.target.parentElement.parentElement);

				// remove from the local storage
				cocktailDB.removeFromDB(e.target.dataset.id);
			}
		});
	}
}
