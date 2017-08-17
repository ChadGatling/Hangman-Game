var wordList = ["Top Gun",
	// "Reaganomics",
	// "As If",
	// "Awesome",
	// "Bad",
	// "Barney",
	// "Bodacious",
	// "Bogus",
	// "Bonus",
	// "Boss",
	"Bow-Head",
	// "Brody",
	// "Take a Chill Pill",
	// "Chillin",
	// "Cool Beans",
	// "Deck",
	// "Def",
	"Don't Have a Cow",
	// "Dudical",
	// "Dweeb",
	// "Fer Sure",
	// "Fresh",
	// "Gag Me With a Spoon",
	// "Generic",
	// "Gnarly",
	// "Grody",
	// "Gross Me Out the Door",
	// "Make Me Barf",
	// "McFly",
	// "Nice Play, Shakespeare",
	// "Preppie",
	// "Radical",
	// "Stoked",
	// "Val",
	// "Wicked",
	// "Yuppie",
]; // list of word to be chossen from to guess
var guessWordIndex = Math.floor(Math.random() * wordList.length); // random number to pick the word from wordlist
var guessWord = wordList[guessWordIndex]; // Randomly chosen word for player to guess
var guessWordLowerCase = guessWord.toLowerCase(); // lower case version of guessWord
var lettersGuessed = []; // gameplay built list of letters the player has guessed
var playing = false; // playing boolean
var answer = []; // guessWord in array form used to build the word as the player guesses correct letters
var alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",]

// console.log(); // debug

for (var i = 0; i <guessWord.length; i++) { // fill in answer[] with _ or " "
	if (guessWord[i] === " ") {
		answer.splice(i, 1, "&nbsp");
	}
	else if (guessWord[i] === "'") {
		answer.splice(i, 1, "'");
	}
	else if (guessWord[i] === "-") {
		answer.splice(i, 1, "-");	
	}
	else {
		answer.splice(i, 1, "|");
	}
}

document.onkeyup = function(event){ // on key pressed

	if (playing === true) { // if game is being played (after title screen)
		console.log("Pushing: " + event.key);
		pushLetter(); // add guessed letters to running list of the letters already guessed

		for  (var answerLetter = 0; answerLetter < guessWord.length; answerLetter++) { // check each letter of guessWord against the letter just guessed
				if (event.key === guessWordLowerCase[answerLetter]) { // if the letters match
					answer.splice(answerLetter, 1, guessWord[answerLetter]); // change the letter at the answerLetter index to the guessed letter
				}
			}
		document.querySelector("#game").innerHTML = "<h2>Your word is : " + answer.join("") + "</h2>" + // new HTML game div
					                                "<h3>Already Guessed: " + lettersGuessed.toString().toUpperCase() + "</h3>"; // new HTML game div	
					                            }
	else if (event.key === "Enter" && playing === false) { // before starting the game (tittle screen) and enter key is pressed
		playing = true // set playing to true
		document.querySelector("#game").innerHTML = "<h2>Your word is : " + answer.join("") + "</h2>"; // new HTML game div
	}

	function pushLetter() {
		console.log("Run pushLetter.");
		for (var isGuessed = 0; isGuessed < lettersGuessed.length; isGuessed++) {
			console.log("Searching lettersGuessed.");
			if (alphabet.find(findkey) === lettersGuessed[isGuessed]) {
				console.log(alphabet.find(findkey) + " already in list.");
			}
			else {
				console.log(alphabet.find(findkey) + " is a new letter.");
				lettersGuessed.push(alphabet.find(findKey));
			}
		}				 
	}

	function findKey(key) {
		return key === event.key;
	}
}

