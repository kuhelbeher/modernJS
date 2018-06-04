class CryptoAPI {
	async queryAPI(currency, cryptoCurrency) {
		const url = await fetch(`https://api.coinmarketcap.com/v2/ticker/${cryptoCurrency}/?convert=${currency}`);

		const result = await url.json();

		return {
			result
		}
	}

	async getCryptoCurrenciesList() {
		const url = await fetch('https://api.coinmarketcap.com/v2/ticker/');
		const cryptoCurrencies = await url.json();

		return {
			cryptoCurrencies
		}
	}
}