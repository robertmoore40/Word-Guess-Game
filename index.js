// Javascript Code

// Variables declared first, arrays then choosenWord, letters, and counters

// Arrays var declared

//Array containing possible pokemon. 

var chooseRandomPokemon =[
    "pikachu",
    "bulbasaur",
    "venusaur",
    "charmander",
    "charizard",
    "eevee",
    "weedle",
    "pidgey",
    "rattata",
    "vulpix",
    "zubat",
    "oddish",
    "diglet",
    "meowth",
    "machoke",
    "gyarados",
    "magikarp",
    "goldeen",
    "snorlax",
    "mew",
    "mewtow",
    "porygon",
    "jolteon"
		];

// Used to record how many times a letter can be pressed. Once a guess has been tried, it cannot be tried again

var possibleKeyInputs = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

// All declared variables sans arrays

//Holds chooseRandomPokemon

var choosenWord = "";

//Holds letters in pokemon chosen

var lettersInWord = [];

//Holds number of blanks in pokemon chosen

var numberOfBlanks = 0;

//Holds blanks for created array and successful guesses

var blanksAndSuccesses =[];

//"Holds" wrong guesses

var wrongLetters = [];

//Counters for winning and losing

var winCount = 0;
var loseCount = 0;
var guessesLeft = 10;
var rightGuessCounter = 0;


//Functions for game use 



function reset()
{
    //Chooses from chooseRandomPokemon
    
	choosenWord = chooseRandomPokemon[Math.floor(Math.random() * chooseRandomPokemon.length)];
    
    //Splits the chosen word into individual letters
    
    lettersInWord = choosenWord.split('');
    
    //create the number of blanks
    
	numberOfBlanks = lettersInWord.length;
	
	//Sets options to reset to
    
    letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 10;
	wrongLetters =[];
	blanksAndSuccesses =[];
	possibleKeyInputs = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	test=false;
    
    startGame();
}

function startGame()
{
	//Chooses word randombly from the chooseRandomPokemon
	choosenWord = chooseRandomPokemon[Math.floor(Math.random() * chooseRandomPokemon.length)];
	//Splits the randomly choosen pokemon into individual letters
	lettersInWord = choosenWord.split('');
	//Get the number of blanks in the randomly choosen pokemon
	numberOfBlanks = lettersInWord.length;
	
	//Reset Function

	rightGuessCounter = 0;
	guessesLeft = 10;
	wrongLetters =[];
	blanksAndSuccesses =[];
	possibleKeyInputs = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

	//fill blanks created by function
	for(var i = 0; i< numberOfBlanks; i++)
	{
		blanksAndSuccesses.push('_');
		document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses;
	}

	//Pushes to HTML during game and console logs
	document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');

	document.getElementById('numGuesses').innerHTML = guessesLeft;
	
	document.getElementById('winCounter').innerHTML = winCount;
	
	document.getElementById('lossCounter').innerHTML = loseCount;
	
	document.getElementById('wrongGuesses').innerHTML = wrongLetters;

	console.log(choosenWord);

	console.log(lettersInWord);
	
	console.log(numberOfBlanks);
	
	console.log(blanksAndSuccesses);
}

function compareLetters(userKey)
{
				console.log('working');
				//If input exists in word, call this function 
				if(choosenWord.indexOf(userKey) > -1)
				{
					//Loops vary depending on the amount of blanks 
					for(var i = 0; i < numberOfBlanks; i++)
					{
						//Fills in right index with user key
						if(lettersInWord[i] === userKey)
						{
							rightGuessCounter++;
							blanksAndSuccesses[i] = userKey;
							document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
						}	
					}
					
					console.log(blanksAndSuccesses);
				}
				//Incorrect guesses/inputs
				else
				{
					wrongLetters.push(userKey);
					guessesLeft--;

					//pushes changes to HTML and logs
					document.getElementById('numGuesses').innerHTML = guessesLeft;
					document.getElementById('wrongGuesses').innerHTML = wrongLetters;
				
					console.log('Wrong Guesses = ' + wrongLetters);
					console.log('Guesses left is ' + guessesLeft);
				}
			
// declare winloss function to recall at end of game
		
}
function winOrLoss()
{
	// When number blanks if filled with correct letters, then alert player of win++
	if(rightGuessCounter === numberOfBlanks)
	{
		// Win count F=function, increases wins by 1 each time (++)
		winCount++;
		//Changes HTML
		document.getElementById('winCounter').innerHTML = winCount;
		alert(" You win! You're the best that ever was! Let's have a rematch!");

		// calls reset function

		reset();
	}
	// When number of guesses reaches 0 then alert player of loss - call back reset function in order to zero guesses
	else if(guessesLeft === 0)
	{
		//Loss count function, increases losses by 1 each time (++)

		loseCount++;
		
		//Changes HTML
		
		document.getElementById('lossCounter').innerHTML = loseCount;
		alert(" Consider joining team rocket - or try again");

		// calls reset function

		reset();
	}
}

// Game Code, call with startGame()

startGame();

document.onkeyup = function(event)
{
	test = true;

	var letterGuessed = event.key;

	for(var i = 0; i < possibleKeyInputs.length; i++)
	{	
		if(letterGuessed === possibleKeyInputs[i] && test === true)
		{
			var spliceWord = possibleKeyInputs.splice(i,1);
		
			compareLetters(letterGuessed);

			// Call win or loss function

			winOrLoss();
		}
	}		
		
}