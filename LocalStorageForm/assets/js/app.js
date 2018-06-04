// variables
const tweetList = document.getElementById('tweet-list');



// event listeners
eventListeners();

function eventListeners() {
	// Form submission
	document.querySelector('#form').addEventListener('submit', newTweet);

	// Remove tweet from the list
	tweetList.addEventListener('click', removeTweet);

	// Document ready
	document.addEventListener('DOMContentLoaded', localStorageOnLoad)
}

// functions
function newTweet(e) {
	e.preventDefault();

	// Read the textarea value
	const tweet = document.getElementById('tweet').value;

	//Create the remove btn
	const removeBtn = document.createElement('a');
	removeBtn.classList = 'remove-tweet';
	removeBtn.textContent = 'X';

	// Create li element
	const li = document.createElement('li');
	li.textContent = tweet;

	// add the remove btn to each tweet
	li.appendChild(removeBtn);

	// Add to the list
	tweetList.appendChild(li);

	// Add into the local storage
	addTweetLocalStorage(tweet);

	// Reset form
	this.reset();
}

// Removes the tweets from the DOM
function removeTweet(e) {
	if (e.target.classList.contains('remove-tweet')) {
		e.target.parentElement.remove();
	}

	// Remove from storage
	removeTweetLocalStorage(e.target.parentElement.textContent);
}

// Adds the tweets into the local storage
function addTweetLocalStorage(tweet) {
	let tweets = getTweetsFromStorage();

	// Add tweet into the array
	tweets.push(tweet);

	// convert tweet array into a string
	localStorage.setItem('tweets', JSON.stringify(tweets));
}

function getTweetsFromStorage() {
	let tweets;
	const tweetsLS = localStorage.getItem('tweets');
	// Get the values
	if (tweetsLS === null) {
		tweets = [];
	} else {
		tweets = JSON.parse(tweetsLS);
	}
	return tweets;
}

// Load tweets on page load
function localStorageOnLoad() {
	let tweets = getTweetsFromStorage();

	// Loop through storage
	tweets.forEach(function(tweet) {
		//Create the remove btn
		const removeBtn = document.createElement('a');
		removeBtn.classList = 'remove-tweet';
		removeBtn.textContent = 'X';

		// Create li element
		const li = document.createElement('li');
		li.textContent = tweet;

		// add the remove btn to each tweet
		li.appendChild(removeBtn);

		// Add to the list
		tweetList.appendChild(li);
	});
}

// REmove tweet from local storage
function removeTweetLocalStorage(tweet) {
	// get tweets from local storage
	let tweets = getTweetsFromStorage();

	// Remove X
	const tweetDelete = tweet.substring(0, tweet.length - 1);

	// Loop through the tweets and remove the tweet
	tweets.forEach(function(tweetLS, index) {
		if (tweetDelete === tweetLS) {
			tweets.splice(index, 1);
		}
	});
	localStorage.setItem('tweets', JSON.stringify(tweets));
}