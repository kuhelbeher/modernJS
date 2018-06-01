// define UI vars
const form = document.querySelector('#task-form'),
			taskList = document.querySelector('.collection'),
			clearBtn = document.querySelector('.clear-tasks'),
			filter = document.querySelector('#filter'),
			taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

function loadEventListeners() {
	document.addEventListener('DOMContentLoaded', getTasks);
	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', removeTask);
	clearBtn.addEventListener('click', clearTasks);
	filter.addEventListener('keyup', filterTasks);
}

// functions
// get tasks from ls
function getTasksFromLocalStorage() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	return tasks;
}

// append tasks to the DOM
function getTasks() {
	let tasks = getTasksFromLocalStorage();

	tasks.forEach(task => {
		addTaskDOM(task);
	});
}

// add task
function addTask(e) {
	e.preventDefault();

	if (taskInput.value === '') {
		alert('Add a task');
	} else {

		addTaskDOM(taskInput.value);

		// store in ls
		storeTaskInLocalStorage(taskInput.value);

		form.reset();
	}
}

// add task to the DOM
function addTaskDOM(task) {
	// create li
	const li = document.createElement('li');
	li.className = 'collection-item';
	li.appendChild(document.createTextNode(task));

	// create link
	const link = document.createElement('a');
	link.className = 'delete-item secondary-content';
	link.innerHTML = '<i class="fas fa-times"></i>';

	li.appendChild(link);

	taskList.appendChild(li);
}

function storeTaskInLocalStorage(task) {
	let tasks = getTasksFromLocalStorage();

	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if(confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();

			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

function removeTaskFromLocalStorage(taskItem) {
	let tasks = getTasksFromLocalStorage();

	tasks.forEach((task, index) => {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
	// taskList.innerHTML = '';

	// removechile is faster - https://jsperf.com/innerhtml-vs-removechild/47
	while(taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
	clearLocalStorage();
}

function clearLocalStorage() {
	localStorage.removeItem('tasks');
}

// filter tasks
function filterTasks(e) {
	const text = e.target.value.toLowerCase();
	
	document.querySelectorAll('.collection-item').forEach(task => {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) !== -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}