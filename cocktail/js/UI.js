class UI {

	// display all the drinks categories
	displayCategories() {
		const categoryList = cocktail.getCategories()
			.then(categories => {
				const catList = categories.categories.drinks;

				const firstOption = document.createElement('option');
				firstOption.textContent = '-Select-';
				firstOption.value = '';
				document.querySelector('#search').appendChild(firstOption); 

				// append into a select
				catList.forEach(category => {
					const option = document.createElement('option');
					option.textContent = category.strCategory;
					option.value = category.strCategory.split(' ').join('_');

					document.querySelector('#search').appendChild(option); 
				});
			});
	}
	
	// display the cocktails without ingredients
	displayDrinks(drinks) {
		// show the rusluts
		const resultsWrapper = document.querySelector('.results-wrapper');
		resultsWrapper.style.display = 'block';

		// insert the results
		const resultsDiv = document.querySelector('#results');

		// loop through drinks
		drinks.forEach(drink => {
			resultsDiv.innerHTML += `
				<div class="col-md-4">
					<div class="card my-3">
						<button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">+</button>
						<img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="card-img-top">
						<div class="card-body">
							<h2 class="card-title text-center">${drink.strDrink}</h2>
							<a href="#" class="btn btn-success get-recipe" data-target="#recipe" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
						</div>
					</div>
				</div>
			`;
		});
		this.isFavorite();
	}
	
	// displays drinks with ingridietns
	displayDrinksWithIngredients(drinks) {
		// show the rusluts
		const resultsWrapper = document.querySelector('.results-wrapper');
		resultsWrapper.style.display = 'block';

		// insert the results
		const resultsDiv = document.querySelector('#results');

		drinks.forEach(drink => {
			resultsDiv.innerHTML += `
				<div class="col-md-6">
					<div class="card my-3">
						<button type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">+</button>
						<img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="card-img-top">
						<div class="card-body">
							<h2 class="card-title text-center">${drink.strDrink}</h2>
							<p class="card-text font-weight-bold">Instructions:</p>
							<p class="card-text">${drink.strInstructions}</p>
							<p class="card-text">
								<ul class="list-group">
									<li class="list-group-item alert alert-danger">Ingredients</li>
										${this.displayIngredients(drink)}
								</ul>
							</p>
							<p class="card-text font-weight-bold">Extra Information</p>
							<p class="card-text">
								<span class="badge badge-pill badge-success">
									${drink.strAlcoholic}
								</span>
								<span class="badge badge-pill badge-warning">
									Category: ${drink.strCategory}
								</span>
							</p>
						</div>
					</div>
				</div>
			`;
		});
		this.isFavorite();
	}

	displayIngredients(drink) {
		let ingredients = [];
		for (let i = 1; i < 16; i++) {
			const ingredientMeasure = {};
			if (drink[`strIngredient${i}`] !== '') {
				ingredientMeasure.ingredient = drink[`strIngredient${i}`];
				ingredientMeasure.measure = drink[`strMeasure${i}`];
				ingredients.push(ingredientMeasure);
			}
		}
		let ingredientsTemplate = '';
		ingredients.forEach(ingredient => {
			if (ingredient.ingredient !== null) {
				ingredientsTemplate += `
					<li class="list-group-item">${ingredient.ingredient}${ingredient.measure.length > 1 ? ' - ' + ingredient.measure : ''}</li>
				`;
			}
		});

		return ingredientsTemplate;
	}

	// display single recipe
	displaySingle(recipe) {
		// get the variables
		const modalTitle = document.querySelector('.modal-title'),
					modalDescription = document.querySelector('.modal-body .description-text'),
					modalIngredients = document.querySelector('.modal-body .ingredient-list .list-group');

		// set the values
		modalTitle.innerHTML = recipe.strDrink;
		modalDescription.innerHTML = recipe.strInstructions;

		// display the ingredients
		modalIngredients.innerHTML = this.displayIngredients(recipe);
	}

	printMessage(message, className) {
		const div = document.createElement('div');
		div.innerHTML = `
			<div class="alert alert-dismissible alert-${className}">
				<button type="button" class="close" data-dismiss="alert">x</button>
				${message}
			</div>
		`;

		const reference = document.querySelector('.jumbotron h1');
		const parentNode = reference.parentElement;
		parentNode.insertBefore(div, reference);

		setTimeout(() => {
			if (document.querySelector('.alert')) {
				document.querySelector('.alert').remove();
			}
		}, 3000);

	}

	// clear previous results
	clearResults() {
		const resultsDiv = document.querySelector('#results');
		resultsDiv.innerHTML = '';
	}

	// displays favorites from the storage
	displayFavorites(favorites) {
		const favoritesTable = document.querySelector('#favorites tbody');

		favorites.forEach(drink => {
			const tr = document.createElement('tr');

			tr.innerHTML = `
				<td>
					<img src="${drink.image}" alt="${drink.name}">
				</td>
				<td>
					${drink.name}
				</td>
				<td>
					<a href="#" data-toggle="modal" data-target="#recipe" data-id="${drink.id}" class="btn btn-success get-recipe">View</a>
				</td>
				<td>
					<a href="#" data-id="${drink.id}" class="btn btn-danger remove-recipe">Remove</a>
				</td>
			`;

			favoritesTable.appendChild(tr);
		});
	}

	// remove single favorite from DOM
	removeFavorite(element) {
		element.remove();
	}

	// add a class when the cocktail is favorite
	isFavorite() {
		const drinks = cocktailDB.getFromDB();

		drinks.forEach(drink => {
			let {id} = drink;

			// select the favorites
			let favoriteDrink = document.querySelector(`[data-id="${id}"]`);
			if (favoriteDrink) {
				favoriteDrink.classList.add('is-favorite');
				favoriteDrink.textContent = '-';
			}
		});
	}
}