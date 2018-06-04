class CocktailAPI {

	// get the recipe by name
	async getDrinksByName(name) {
		const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
		const cocktails = await apiResponse.json();

		return {
			cocktails
		}
	}
	
	// get the ricipe by ingredient
	async getDrinksByIngredient(name) {
		const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${name}`);
		const cocktails = await apiResponse.json();

		return {
			cocktails
		}
	}

	// get single recipe
	async getSingleRecipe(id) {
		const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
		const recipe = await apiResponse.json();

		return {
			recipe
		}
	}

	// retrieves all teh categories
	async getCategories() {
		const apiResponse = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
		const categories = await apiResponse.json();

		return {
			categories
		}
	}

	// get drinks by category
	async getDrinksByCategory(category) {
		const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
		const cocktails = await apiResponse.json();

		return {
			cocktails
		}
	}

	// get drinks by alcohol type
	async getDrinksByAlcohol(term) {
		const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);
		const cocktails = await apiResponse.json();

		return {
			cocktails
		}
	} 
}