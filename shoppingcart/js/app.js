// variables
const courses = document.querySelector('#courses-list'),
			shoppingCartContent = document.querySelector('#cart-content tbody');
			clearCartBtn = document.querySelector('#clear-cart');

// Listeners
loadEventListeners();

function loadEventListeners() {
	// When a new course is added
	courses.addEventListener('click', buyCourse);
	// When remove course from the cart
	shoppingCartContent.addEventListener('click', removeCourse);
	// clear cart btn
	clearCartBtn.addEventListener('click', clearCart);
	// document ready
	document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}

// Functions
function buyCourse(e) {
	e.preventDefault();
	let courses = getCoursesFromStorage(),
			isInCoursesList = false;

	isInCoursesList = courses.some(function(courseLS) {
		return courseLS.id === e.target.getAttribute('data-id');
	});

	if (e.target.classList.contains('add-to-cart') && !isInCoursesList) {
		// Read the course values
		const course = e.target.parentElement.parentElement;

		// read the value
		getCourseInfo(course);
	}
}

// Read the html information of the selected course
function getCourseInfo(course) {
	// Create an object with course data\
	const courseInfo = {
		image: course.querySelector('img').src,
		title: course.querySelector('h4').textContent,
		price: course.querySelector('.price span').textContent,
		id: course.querySelector('a').getAttribute('data-id')
	}
	// Inser into the shopping cart
	addIntoCart(courseInfo);
}

// Display the selected couse into the shopping cart
function addIntoCart(course) {
	// create a tr
	const row = document.createElement('tr');

	// Build the template
	row.innerHTML = `
	<tr>
		<td>
			<img src="${course.image}" width="100%">
		</td>
		<td>
			${course.title}
		</td>
		<td>
			${course.price}
		</td>
		<td>
			<a href="#" class="remove" data-id="${course.id}">X</a>
		</td>
	</tr>
	`;

	// Add into the shopping cart
	shoppingCartContent.appendChild(row);
	// add course into the storage
	saveIntoStorage(course);
}

function saveIntoStorage(course) {
	let courses = getCoursesFromStorage();

	// add the course into the array
	courses.push(course);
	localStorage.setItem('courses', JSON.stringify(courses));
}

// Get the contents from storage
function getCoursesFromStorage() {
	let courses;
	
	if (localStorage.getItem('courses') === null) {
		courses = [];
	} else {
		courses = JSON.parse(localStorage.getItem('courses'));
	}
	return courses;
}

function removeCourse(e) {
	let courseId;
	// Remove from the DOM
	if (e.target.classList.contains('remove')) {
		courseId = e.target.getAttribute('data-id');
		e.target.parentElement.parentElement.remove();
	}
	// Remove from the local storage
	removeCourseLocalStorage(courseId);
}

function removeCourseLocalStorage(id) {
	let coursesLS = getCoursesFromStorage();
	
	coursesLS.forEach(function(course, index) {
		if (course.id === id) {
			coursesLS.splice(index, 1);
		}
	});

	localStorage.setItem('courses', JSON.stringify(coursesLS));
}

// clear Cart
function clearCart() {
	// shoppingCartContent.innerHTML = '';
	// Recomended way
	while (shoppingCartContent.firstChild) {
		shoppingCartContent.removeChild(shoppingCartContent.firstChild);
	}

	// Clear from the local storage
	clearLocalStorage();
}

function clearLocalStorage() {
	localStorage.clear();
}

function getFromLocalStorage() {
	let coursesLS = getCoursesFromStorage();

	// Loop through the courses
	coursesLS.forEach(function(course) {
		const row = document.createElement('tr');

		row.innerHTML = `
		<tr>
			<td>
				<img src="${course.image}" width="100%">
			</td>
			<td>
				${course.title}
			</td>
			<td>
				${course.price}
			</td>
			<td>
				<a href="#" class="remove" data-id="${course.id}">X</a>
			</td>
		</tr>
		`;

		shoppingCartContent.appendChild(row);
	});
}