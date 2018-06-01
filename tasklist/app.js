// define UI vars
const form = document.querySelector('#task-form'),
			taskList = document.querySelector('.collection'),
			clearBtn = document.querySelector('.clear-tasks'),
			filter = document.querySelector('#filter'),
			taskInput = document.querySelector('#task');

// load all event listeners
loadEventListeners();

function loadEventListeners() {
	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', removeTask);
	clearBtn.addEventListener('click', clearTasks);
	filter.addEventListener('keyup', filterTasks);
}

// functions
// add task
function addTask(e) {
	e.preventDefault();

	if (taskInput.value === '') {
		alert('Add a task');
	} else {

		// create li
		const li = document.createElement('li');
		li.className = 'collection-item';
		li.appendChild(document.createTextNode(taskInput.value));

		// create link
		const link = document.createElement('a');
		link.className = 'delete-item secondary-content';
		link.innerHTML = '<i class="fas fa-times"></i>';

		li.appendChild(link);

		taskList.appendChild(li);

		form.reset();
	}
}

// remove task
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if(confirm('Are you sure?')) {
			e.target.parentElement.parentElement.remove();
		}
	}
}

// Clear tasks
function clearTasks() {
	// taskList.innerHTML = '';

	// removechile is faster - https://jsperf.com/innerhtml-vs-removechild/47
	while(taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
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