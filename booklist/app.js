// Book constructor
function Book(title, author, isbn) {
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// UI constructor
function UI() {

}

UI.prototype.addBookToList = (book) => {
	const list = document.getElementById('book-list');

	// create tr
	const row = document.createElement('tr');

	row.innerHTML = `
		<td>${book.title}</td>
		<td>${book.author}</td>
		<td>${book.isbn}</td>
		<td><a href="#" class="delete">X</a></td>
	`;

	list.appendChild(row);
}

UI.prototype.clearFields = () => {
	document.getElementById('book-form').reset();
}

UI.prototype.showAlert = (message, className) => {
	const div = document.createElement('div');
	div.className = `alert ${className}`;
	div.appendChild(document.createTextNode(message));

	const container = document.querySelector('.container');
	const form = document.querySelector('#book-form');

	container.insertBefore(div, form);

	setTimeout(() => {
		document.querySelector('.alert').remove();
	}, 3000);
}

UI.prototype.deleteBook = (target) => {
	target.remove();
}


// Event listeners
document.getElementById('book-form').addEventListener('submit', (e) => {
	e.preventDefault();

	// get form values
	const title = document.getElementById('title').value,
				author = document.getElementById('author').value,
				isbn = document.getElementById('isbn').value;

	const book = new Book(title, author, isbn);
	
	const ui = new UI();

	// validate
	if (title === '' || author === '' || isbn === '') {
		// error alert
		ui.showAlert('All fields are required', 'error');
	} else {
		// add book to list
		ui.addBookToList(book);

		ui.showAlert('Book added', 'success');

		// clear fields
		ui.clearFields();
	}
});

// event listener for delete
document.getElementById('book-list').addEventListener('click', (e) => {
	e.preventDefault();

	const ui = new UI();

	if (e.target.classList.contains('delete')) {
		ui.deleteBook(e.target.parentElement.parentElement);
		ui.showAlert('Book removed', 'success');
	}
});