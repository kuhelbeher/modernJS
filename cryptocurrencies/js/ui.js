class UI {
	constructor() {
		this.init();
	}
	init() {
		this.printCryptoCurrencies();
	}

	printCryptoCurrencies() {
		cryptoAPI.getCryptoCurrenciesList()
			.then(data => {
				const cryptoCurrencies = data.cryptoCurrencies.data;
				const select = document.getElementById('cryptocurrency');

				for (let key in cryptoCurrencies) {
					const option = document.createElement('option');
					option.value = cryptoCurrencies[key].id;
					option.appendChild(document.createTextNode(cryptoCurrencies[key].name));
					select.appendChild(option);
				};
			});
	}

	// prints message
	printMessage(message, className) {
		const div = document.createElement('div');

		div.className = className;
		div.appendChild(document.createTextNode(message));

		const messagesDiv = document.querySelector('.messages');

		messagesDiv.appendChild(div);

		setTimeout(() => {
			document.querySelector('.messages div').remove();
		}, 3000);
	}

	displayResult(result, currency) {
		let HTMLTemplate = '';
		
		const prevResult = document.querySelector('#result > div');
		if (prevResult) {
			prevResult.remove();
		}

		HTMLTemplate += `
			<div class="card cyan darken-3">
				<div class="card-content white-text">
					<span class="card-title">Result</span>
					<p>The price of ${result.name} is ${result.quotes[currency].price} ${currency}</p>
					<p>The last hour: ${result.quotes[currency].percent_change_1h}%</p>
					<p>The last day: ${result.quotes[currency].percent_change_24h}%</p>
					<p>The last seven days: ${result.quotes[currency].percent_change_7d}%</p>
				</div>
			</div>
		`;

		this.showSpinner();

		setTimeout(() => {
			const divResult = document.querySelector('#result');
			divResult.innerHTML = HTMLTemplate;

			document.querySelector('.spinner img').remove();
		}, 3000);

	}

	showSpinner() {
		const spinnerGIF = document.createElement('img');
		spinnerGIF.src = 'img/spinner.gif';
		document.querySelector('.spinner').appendChild(spinnerGIF);
	}
}