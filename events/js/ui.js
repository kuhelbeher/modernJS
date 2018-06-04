class UI {
	constructor() {
		this.init();
	}

	init() {
		this.printCategories();
		this.result = document.getElementById('result');
	}

	printCategories() {
		const categoriesList = eventbrite.getCategoriesAPI()
														.then(categories => {
															const categoriesList = categories.categories.categories;
															const categoriesSelect = document.querySelector('#category');
															
															categoriesList.forEach(category => {
																const catOption = document.createElement('option');
																catOption.value = category.id;
																catOption.appendChild(document.createTextNode(category.name));
																categoriesSelect.appendChild(catOption);
															});
														})
														.catch(error => console.log(error));
	}

	printMessage(message, className) {
		const div = document.createElement('div');
		div.className = className;

		div.appendChild(document.createTextNode(message));

		const searchEvents = document.getElementById('search-events');
		searchEvents.appendChild(div);

		setTimeout(() => {
			this.removeMessage();
		}, 3000);
		
	}

	removeMessage() {
		const alert = document.querySelector('#search-events > .alert');
		if (alert) {
			alert.remove();
		}
	}

	displayEvents(events) {
		let HTMLTemplate = '';

		events.forEach(eventInfo => {
			HTMLTemplate += `
				<div class="col-md-4 mb-4">
					<div class="card">
						<div class="card-body">
							<img class="img-fluid mb-2" src="${eventInfo.logo !== null ? eventInfo.logo.url : '' }">
						</div>
						<div class="card-body">
							<div class="card-text">
								<h2 class="text-center card-title">${eventInfo.name.text}</h2>
								<p class="lead text-info">Event Information:</p>
								<p>${eventInfo.description.text.substring(0,200)  } ... </p>

								<span class="badge badge-primary">Capacity: ${eventInfo.capacity}</span>
								<span class="badge badge-secondary">Date & Time: ${eventInfo.start.local}</span>

								<a href="${eventInfo.url}" target="_blank" class="btn btn-primary btn-block mt-4">Get Tickets</a>
							</div>
						</div>
					</div>
				</div>
			`;
		});
		this.result.innerHTML = HTMLTemplate;
	}

	// clear the previous results
	clearResults() {
		this.result.innerHTML ='';
	}
}