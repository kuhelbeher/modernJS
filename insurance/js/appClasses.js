// variables
const form = document.getElementById('request-quote'),
			html = new HTMLUI();

// Event Listeners
eventListeners();

function eventListeners() {
	document.addEventListener('DOMContentLoaded', function() {
		html.displayYears();
	});
	
	// form submitted
	form.addEventListener('submit', function(e) {
		e.preventDefault();
			
		const make = document.getElementById('make').value;
		const year = document.getElementById('year').value;
		const level = document.querySelector('input[name="level"]:checked').value;

		if (make === '' || year === '' || level === '') {
			html.displayError('All the fields are mandatory');
		} else {
			const prevResult = document.querySelector('#result div');
			if (prevResult != null) {
				prevResult.remove();
			}

			const insurance = new Insurance(make, year, level);
			const price = insurance.calculateQuotation(insurance);

			html.showResults(price, insurance);
		}
	});
}
