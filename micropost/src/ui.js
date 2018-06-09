class UI {
	constructor() {
		this.posts = document.querySelector('#posts');
		this.titleInput = document.querySelector('#title');
		this.bodyInput = document.querySelector('#body');
		this.idInput = document.querySelector('#id');
		this.postSubmit = document.querySelector('.post-submit');
		this.titleInput = document.querySelector('#title');
		this.forState = 'add';
	}

	showPosts(posts) {
		let output = '';

		posts.forEach(post => {
			output += `
				<div class="card mb-3">
					<div class="card-body">
						<h4 class="card-title">${post.title}</h4>
						<p class="card-text">${post.body}</p>
						<a href="#" class="edit card-link" data-id="${post.id}"><i class="fas fa-edit"></i></a>
						<a href="#" class="delete card-link" data-id="${post.id}"><i class="fas fa-times"></i></a>
					</div>
				</div>
			`;
		});

		this.posts.innerHTML = output;
	}

	showAlert(message, className) {
		this.clearAlert();

		// create div
		const div = document.createElement('div');

		div.className = className;
		div.appendChild(document.createTextNode(message));
		// get parrent
		const container = document.querySelector('.postContainer');

		container.insertBefore(div, this.posts);

		setTimeout(() => {
			this.clearAlert();
		}, 3000);
	}

	clearAlert() {
		const currentAlert = document.querySelector('.alert');

		if (currentAlert) {
			currentAlert.remove();
		}
	}

	clearFields() {
		this.titleInput.value = '';
		this.bodyInput.value = '';
	}

	fillForm(data) {
		this.titleInput.value = data.title;
		this.bodyInput.value = data.body;
		this.idInput.value = data.id;

		this.changeFormState('edit');
	}

	clearIdInput() {
		this.idInput.value = '';
	}

	changeFormState(type) {
		if (type === 'edit') {
			this.postSubmit.textContent = 'Update Post';
			this.postSubmit.className = 'post-submit btn btn-warning btn-block';

			// create cancel button
			const button = document.createElement('button');
			button.className = 'post-cancel btn btn-light btn-block';
			button.appendChild(document.createTextNode('Cancale Edit'));

			const cardForm = document.querySelector('.card-form');
			const formEnd = document.querySelector('.form-end');
			cardForm.insertBefore(button, formEnd);
		} else {
			this.postSubmit.textContent = 'Post It';
			this.postSubmit.className = 'post-submit btn btn-primary btn-block';

			if (document.querySelector('.post-cancel')) {
				document.querySelector('.post-cancel').remove();
			}
			this.clearIdInput();

			this.clearFields();
		}
	}
}

export const ui = new UI();