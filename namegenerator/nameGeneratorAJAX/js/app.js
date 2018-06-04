document.querySelector('#generate-names').addEventListener('submit', loadNames);

function loadNames(e) {
	e.preventDefault();

	const origin = document.getElementById('country').value;
	const genre = document.getElementById('genre').value;
	const amount = document.getElementById('quantity').value;

	let url = 'http://uinames.com/api/?';

	if (origin !== '') {
		url += `region=${origin}&`;
	}

	if (genre !== '') {
		url += `gender=${genre}&`;
	}

	if (amount !== '') {
		url += `amount=${amount}`;
	}
	
	// AJAX Call
	const xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);

	xhr.onload = function() {
		if (this.status === 200) {
			const names = JSON.parse( this.responseText );
			
			let html = '<h2>Generated Names</h2>';

			html += '<ul class="list">';
			names.forEach(function(name) {
				html += `
					<li>${name.name}</li>
				`;
			});


			html += '</ul>';

			document.querySelector('#result').innerHTML = html;
		}
	}

	xhr.send();
}