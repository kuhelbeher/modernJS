const cryptoAPI = new CryptoAPI();
const ui = new UI();

const form = document.getElementById('form');


// event listeners
form.addEventListener('submit', (e) => {
	e.preventDefault();

	const currencySelect = document.getElementById('currency').value;
	const cryptoCurrencySelect = document.getElementById('cryptocurrency').value;

	// validate select
	if (currencySelect === '' || cryptoCurrencySelect === '') {
		ui.printMessage('All fields are required', 'deep-orange darken-4 card-panel');
	} else {
		cryptoAPI.queryAPI(currencySelect, cryptoCurrencySelect)
			.then(data => {
				ui.displayResult(data.result.data, currencySelect);
			});
	}
})