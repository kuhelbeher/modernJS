// listen for submit
document.getElementById('loan-form').addEventListener('submit', (e) => {
	e.preventDefault();

	// hide results
	document.getElementById('results').style.display = 'none';

	// show loader
	document.getElementById('loading').style.display = 'block';

	setTimeout(calculateResults, 2000);
});

function calculateResults(e) {
	const amount = document.getElementById('amount'),
				interest = document.getElementById('interest'),
				years = document.getElementById('years'),
				monthlyPayment = document.getElementById('monthly-payment'),
				totalPayment = document.getElementById('total-payment'),
				totalInterest = document.getElementById('total-interest');

	const principal = parseFloat(amount.value);
	const calculatedInterest = parseFloat(interest.value) / 100 / 12;
	const calculatedPayments = parseFloat(years.value) * 12;

	// compete monthly payments
	const x = Math.pow(1 + calculatedInterest, calculatedPayments);
	const monthly = (principal * x * calculatedInterest)/(x-1);

	if (isFinite(monthly)) {
		monthlyPayment.value = monthly.toFixed(2);
		totalPayment.value = (monthly * calculatedPayments).toFixed(2);
		totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

		// show results
		document.getElementById('results').style.display = 'block';

		// hide loader
		document.getElementById('loading').style.display = 'none';
	} else {
		document.getElementById('results').style.display = 'none';
		document.getElementById('loading').style.display = 'none';

		showMessage('Please check your numbers', 'alert alert-danger');
	}
}

// show message
function showMessage(message, className) {
	const messageDiv = document.createElement('div');

	const card = document.querySelector('.card');
	const heading = document.querySelector('.heading');

	messageDiv.className = className;

	messageDiv.appendChild(document.createTextNode(message));

	card.insertBefore(messageDiv, heading);

	setTimeout(() => {
		document.querySelector('.card .alert').remove();
	}, 3000);
}