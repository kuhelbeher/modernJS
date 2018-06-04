// classes
class Budget {
	constructor(budget) {
		this.budget = budget;
		this.budgetLeft = this.budget;
	}

	substractFromBudget(amount) {
		return this.budgetLeft -= amount;
	}
}

// HTML
class HTML {
	insertBudget(amount) {
		budgetTotal.innerHTML = `${amount}`;
		budgetLeft.innerHTML = `${amount}`;
	}

	printMessage(message, className) {
		const messageWrapper = document.createElement('div');
		messageWrapper.classList.add('text-center', 'alert', className);
		messageWrapper.appendChild(document.createTextNode(message));

		document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

		setTimeout(() => {
			document.querySelector('.primary .alert').remove();
			// addExpenseForm.reset();
		}, 3000);
	}

	addExpenseToList(name, amount) {
		const expensesList = document.querySelector('#expenses ul');

		const li = document.createElement('li');
		li.className ="list-group-item d-flex justify-content-between align-items-center";

		li.innerHTML = `
			${name}
			<span class="badge badge-primary badge-pill">${amount}</span>
		`;

		expensesList.appendChild(li);
	}

	trackBudget(amount) {
		const budgetLeftDollars = budget.substractFromBudget(amount);
		budgetLeft.innerHTML = `${budgetLeftDollars}`;

		if ( (budget.budget / 4) > budgetLeftDollars ) {
			budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
			budgetLeft.parentElement.parentElement.classList.add('alert-danger');
		} else if ( (budget.budget / 2) > budgetLeftDollars ) {
			budgetLeft.parentElement.parentElement.classList.remove('alert-success');
			budgetLeft.parentElement.parentElement.classList.add('alert-warning');
		}
	}
}

// variables
const addExpenseForm = document.getElementById('add-expense'),
			budgetTotal = document.querySelector('span#total'),
			budgetLeft = document.querySelector('span#left');

let budget, userBudget;

const html = new HTML();
// Event Listeners
eventListeners();

function eventListeners() {
	document.addEventListener('DOMContentLoaded', function() {
		userBudget = Number(prompt('What\'s your budge for this week?'));
		
		if (userBudget === null || Number.isNaN(userBudget) || userBudget <= 0) {
			window.location.reload();
		} else {
			budget = new Budget(userBudget);

			html.insertBudget(budget.budget);
		}
	});

	addExpenseForm.addEventListener('submit', function(e) {
		e.preventDefault();
		const expanseName = document.querySelector('#expense').value;
		const amount = Number(document.querySelector('#amount').value);

		if (expanseName === '' || Number.isNaN(amount) || amount <= 0)  {
			html.printMessage('There was error, all fields are required', 'alert-danger');
		} else {
			html.addExpenseToList(expanseName, amount);
			html.trackBudget(amount);

			html.printMessage('Added...', 'alert-success');
		}
	});
}