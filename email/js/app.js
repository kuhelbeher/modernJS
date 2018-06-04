// variables
const sendBtn = document.getElementById('sendBtn'),
			email = document.getElementById('email'),
			subject = document.getElementById('subject'),
			message = document.getElementById('message'),
			resetBtn = document.getElementById('resetBtn'),
			sendEmailForm = document.getElementById('email-form');

// Event listeners
eventListeners();

function eventListeners() {
	document.addEventListener('DOMContentLoaded', appInit);

	email.addEventListener('blur', validateField);
	subject.addEventListener('blur', validateField);
	message.addEventListener('blur', validateField);
	sendEmailForm.addEventListener('submit', sendEmail);
	resetBtn.addEventListener('click', resetForm);
}

// Functions

function appInit() {
	sendBtn.disabled = true;
}

function sendEmail(e) {
	e.preventDefault();

	const spinner = document.getElementById('spinner');
	spinner.style.display = 'block';

	const sent = document.createElement('img');
	sent.src = 'img/mail.gif';
	sent.style.display = 'block';

	setTimeout(function() {
		spinner.style.display = 'none';
		document.querySelector('#loaders').appendChild(sent);
		setTimeout(function() {
			sendEmailForm.reset();
			sent.remove();
		}, 3000);
	}, 3000);
}

// Validate Fields
function validateField() {
	let errors;

	// validate the length of the field
	
	validateLength(this);
	// validate email
	if (this.type == 'email') {
		validateEmail(this);
	}

	// both will return errors, then chek 
	errors = document.querySelectorAll('.error');

	if (email.value !== '' && subject.value !== '' && message.value !== '') {
		if (errors.length === 0) {
			sendBtn.disabled = false;
		}
	}
}

// validates the length of the field
function validateLength(field) {
	if (field.value.length > 0) {
		field.style.borderBottomColor = 'green';
		field.classList.remove('error');
	} else {
		field.style.borderBottomColor = 'red';
		field.classList.add('error');
	}
}

// validate email
function validateEmail(field) {
	let emailText = field.value;

	if (emailText.indexOf('@') !== -1) {
		field.style.borderBottomColor = 'green';
		field.classList.remove('error');
	} else {
		field.style.borderBottomColor = 'red';
		field.classList.add('error');
	}
}

function resetForm() {
	sendEmailForm.reset();
}