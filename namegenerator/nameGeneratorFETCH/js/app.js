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
	
	// Fetch
	fetch(url)
		.then(function(response) {
			return response.json();
		})
		.then(function(names) {
			let html = '<h2>Generated Names</h2>';

			html += '<ul class="list">';
			names.forEach(function(name) {
				html += `
					<li>${name.name}</li>
				`;
			});


			html += '</ul>';

			document.querySelector('#result').innerHTML = html;
		})
		.catch(function(error) {
			console.log(error);
		});

}
