var wordList = [ // list of word to be chossen from to guess
"Top Gun",
"Reaganomics",
"As If",
"Awesome",
"Bad",
"Barney",
"Bodacious",
"Bogus",
"Bonus",
"Boss",
"Bow-Head",
"Brody",
"Take a Chill Pill",
"Chillin",
"Cool Beans",
"Deck",
"Def",
"Don't Have a Cow",
"Dudical",
"Dweeb",
"Fer Sure",
"Fresh",
"Gag Me With a Spoon",
"Generic",
"Gnarly",
"Grody",
"Gross Me Out the Door",
"Make Me Barf",
"McFly",
"Nice Play, Shakespeare",
"Preppie",
"Radical",
"Stoked",
"Val",
"Wicked",
"Yuppie",
];

var guessWordIndex = Math.floor(Math.random() * wordList.length); // random number to pick the word from wordList
var guessWord = wordList[guessWordIndex]; // Randomly chosen word for player to guess
var guessWordLowerCase = guessWord.toLowerCase(); // lower case version of guessWord
var lettersGuessed = []; // gameplay built list of letters the player has guessed
var playing = false; // playing boolean
var answer = []; // guessWord in array form used to build the word as the player guesses correct letters
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]; // alphabet to campare against
var lives = 10; // lives 
var correctGuess = false; // correct guess or not
var missingLetters; // number of missing letters

console.log("Answer: " + guessWord); // debug

for (var i = 0; i < guessWord.length; i++) { // fill in answer with spaces or punctiation
	if (guessWord[i] === " ") {
		answer.splice(i, 1, "&nbsp");
	}
	else if (guessWord[i] === "'") {
		answer.splice(i, 1, "'");
	}
	else if (guessWord[i] === "-") {
		answer.splice(i, 1, "-");	
	}
	else if (guessWord[i] === ",") {
		answer.splice(i, 1, ",");	
	}
	else {
		answer.splice(i, 1, "?");
	}
}

document.onkeyup = function(event){ // on key pressed

	var guess = alphabet.find(isLetter); // variable containing the letter just pressed
	console.log("Guess index: " + alphabet.indexOf(guess));

	if (event.key === "Enter" && playing === false) { // before starting the game (tittle screen) and enter key is pressed
		console.log("Starting new Game.");

		document.querySelector("#game").innerHTML = // new HTML game div
		"<h2>Your word is : " + answer.join("") + "</h2>" +
		"<h3>Press a key to guess a letter.</h3>";

		playing = true; // set playing to true

	} else if (playing === true && alphabet.indexOf(guess) >= 0) { // if game is being played (after title screen)

		if (lettersGuessed.some(notInList)) { // if the letter is already in the list
			return; // do nothing
		} else {			
			lettersGuessed.push(guess); // add guessed letters to running list of the letters already guessed
		}

		for  (var i = 0; i < guessWord.length; i++) { // check each letter of guessWord against the letter just guessed
			if (guess === guessWordLowerCase[i]) { // if the letters match
				answer.splice(i, 1, guessWord[i]); // change the letter at the i index to the guessed letter from the word
				correctGuess = true;
				console.log("letter was found set correct guess to true");
			}
		}

		countMissingLetters(); // adjust missingLetters variable
		console.log(correctGuess);
		if (correctGuess === false) { // if letter was not in word
			console.log("it was false")
			lives--;
		}

		correctGuess = false;

		document.querySelector("#game").innerHTML = // Display game
		"<h2>Your word is : " + answer.join("") + "</h2>" + 
		"<h3>Already Guessed: " + lettersGuessed.sort().toString().toUpperCase() + "</h3>" + 
		"<h4>Lives remaining: " + lives + "</h4>";

	}

	if (missingLetters <= 0) { // If no missingLetters left (Win)
		playing = false;

		document.querySelector("#game").innerHTML = // Congratulations screen
		"<h1>RADICAL TO THE MAX!!!!</h1>" + 
		"<h2>You won!</h2>" + 
		"<h3>The word was " + guessWord + "</h3>" +
		"<h3>Now go get yourself a Crystal Pepsi. You deserve it.</h3>" +
		"<h5>Press Enter to play again.</h5>";

		if (event.key === "Enter") { // hit enter to reload the page
			location.reload(true);
		}
	}

	if (lives <= 0) { // If no lives left (lose)
		playing = false;

		document.querySelector("#game").innerHTML = // Game over screen
		"<h1>GAME OVER!!!!</h1>" +
		"<h3>The word was " + guessWord + "</h3>" +
		"<h2>Like, totally bogus ya jabroni!</h2>" +
		"<h5>Press Enter to play again.</h5>";

		if (event.key === "Enter") { // hit enter to reload the page
			location.reload(true);
		}
	}


	function isLetter(key) {
		return key === event.key
	}

	function notInList(letter) {
		return letter === guess
	}
	function countMissingLetters() {
		missingLetters = 0;
		for (var i = 0; i < answer.length; i++) {
			if (answer[i] === "?") {
				missingLetters++;
			}
		}
		console.log("Missing letters: " + missingLetters);
	}
}

