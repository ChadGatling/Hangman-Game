var wordList = ["Top Gun"]; // list of word to be chossen from to guess
var guessWordIndex = Math.floor(Math.random() * wordList.length); // random number to pick the word from wordlist
var guessWord = wordList[guessWordIndex]; // Randomly chosen word for player to guess
var guessWordLowerCase = guessWord.toLowerCase(); // lower case version of guessWord
var lettersGuessed = []; // gameplay built list of letters the player has guessed
var playing = false; // playing boolean
var answer = []; // guessWord in array form used to build the word as the player guesses correct letters

console.log(playing, guessWordLowerCase); // debug

for (var i = 0; i <guessWord.length; i++) { // fill in answer[] with _ or " "
	if (guessWord[i] === " ") {
		answer.splice(i, 1, " ");
	}
	else {
		answer.splice(i, 1, "_ ");
	}
}

console.log(answer); // debug

document.onkeyup = function(event){ // on key pressed

	console.log(":" + event.key + ":"); // debug
	if (playing === true) { // if game is being played (after title screen)
		lettersGuessed.push(event.key.toLowerCase()); // add guessed letters to running list of the letters already guessed
		console.log(lettersGuessed.toString()); // debug

		for  (var answerLetter = 0; answerLetter < guessWord.length; answerLetter++) { // check each letter of guessWord against the letter just guessed
			// for (var guessLetter = 0; guessLetter < lettersGuessed.length; guessLetter++) {
				if (event.key === guessWordLowerCase[answerLetter]) { // if the letters match
					answer.splice(answerLetter, 1, guessWord[answerLetter]); // change the letter at the answerLetter index to the guessed letter					
				// }
			}
		}
		document.querySelector("#game").innerHTML = "<h2>Your word is " + answer.join("") + "</h2>" + // new HTML game div
					                                "<h3>Already Guessed: " + lettersGuessed.toString().toUpperCase() + "</h3>"; // new HTML game div	
	}
	else if (event.key === "Enter" && playing === false) { // before starting the game (tittle screen) and enter key is pressed
		playing = true // set playing to true
		document.querySelector("#game").innerHTML = "<h2>Your word is " + answer.join("") + "</h2>"; // new HTML game div
	}
	console.log(guessWord, answer.join("")); // debug	
}
