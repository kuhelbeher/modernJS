/*
ПРАВИЛА ИГРЫ:
- игрок должен угадать число между min и max
- игрок получает определённое количество попыток
- оповещать игрока об оставшихся попытках
- оповещать игрока о правильном или неправильном ответе
- разрешить игроку сыграть снова
*/

// game values
let min = 1,
		max = 10,
		winningNum = getRandomNum(min, max),
		guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
			minNum = document.querySelector('.min-num'),
			maxNum = document.querySelector('.max-num'),
			guessBtn = document.querySelector('#guess-btn'),
			guessInput = document.querySelector('#guess-input'),
			message = document.querySelector('.message');

// assign UI min max
minNum.textContent = min;
maxNum.textContent = max;

// play again event listener
game.addEventListener('mousedown', (e) => {
	if (e.target.className === 'play-again') {
		window.location.reload();
	}
});

// listen for guess
guessBtn.addEventListener('click', () => {
	let guess = parseInt(guessInput.value);

	// validate input
	if (Number.isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	} else if (guess === winningNum) {
		gameOver(true, `${winningNum} is correct. You win!`);
	} else {
		guessesLeft -= 1;

		if (guessesLeft === 0) {
			// game over - lost
			gameOver(false, `Game over :( The correct number was ${winningNum}`);
		} else {
			// game continues - answer wrong
			guessInput.borderColor = 'red';
			guessInput.value = '';
			setMessage(`${guess} is not correct. ${guessesLeft} guesses left`, 'red');
		}
	}
});

// game over 
function gameOver(won, msg) {
	let color;
	color = won ? 'green' : 'red'; 
	guessInput.disabled = true;
	guessInput.style.borderColor = color;

	setMessage(msg, color);

	// play again
	guessBtn.value = 'Play Again';
	guessBtn.className += 'play-again';
}

// set message
function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}

function getRandomNum(min, max) {
	return ~~(Math.random() * (max - min + 1) + min);
}
