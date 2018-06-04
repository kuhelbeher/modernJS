class CocktailDB {
	
	saveIntoDB(drink) {
		const drinks = this.getFromDB();

		drinks.push(drink);

		localStorage.setItem('drinks', JSON.stringify(drinks));
	}
	
	getFromDB() {
		let drinks;
		// check from the storage
		if (localStorage.getItem('drinks') === null) {
			drinks = [];
		} else {
			drinks = JSON.parse(localStorage.getItem('drinks'));
		}
		return drinks;
	}

	// removes element from the local storage
	removeFromDB(id) {
		const drinks = this.getFromDB();

		drinks.forEach((drink, index) => {
			if (id === drink.id) {
				drinks.splice(index, 1);
			}
		});
		// set the array into the local storage
		localStorage.setItem('drinks', JSON.stringify(drinks));
	}
}