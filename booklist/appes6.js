class Book {
	constructor(title, author, isbn) {
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {

	addBookToList(book) {
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

	clearFields() {
		document.getElementById('book-form').reset();
	}

	showAlert(message, className) {
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

	deleteBook(target) {
		target.remove();
	}
}

// Local storage class
class Store {
	static getBooks() {
		let books;
		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}

	static displayBooks() {
		const books = this.getBooks();
		const ui = new UI();

		books.forEach((book) => {
			ui.addBookToList(book);
		});
	}

	static addBook(book) {
		const books = this.getBooks();

		books.push(book);

		localStorage.setItem('books', JSON.stringify(books));
	}

	static removeBook(isbn) {
		const books = this.getBooks();

		books.forEach((book, index) => {
			if (book.isbn === isbn) {
				books.splice(index, 1);
			}
		});

		localStorage.setItem('books', JSON.stringify(books));
	}
}

// Event listeners
document.addEventListener('DOMContentLoaded', Store.displayBooks());

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

		Store.addBook(book);

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
		Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
		ui.showAlert('Book removed', 'success');
	}
});