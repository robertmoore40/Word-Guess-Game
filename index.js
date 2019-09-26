// Javascript Code

//Array containing possible pokemon

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

var doubleWord = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

//Holds chooseRandomPokemon

var choosenWord = "";

//Holds letters in pokemon chosen

var lettersInWord = [];

//Holds number of blanks in pokemon chosen

var numBlanks = 0;

//Holds blanks for created array and successful guesses

var blanksAndSuccesses =[];

//Holds wrong guesses

var wrongLetters = [];

//Counters for winning and losing

var winCount = 0;
var loseCount = 0;
var guessesLeft = 10;
var rightGuessCounter = 0;


//FUNCTIONS
//----------------------------------------


function reset()
{
    //Chooses from chooseRandomPokemon
    
	choosenWord = chooseRandomPokemon[Math.floor(Math.random() * chooseRandomPokemon.length)];
    
    //Splits the chosen word into individual letters
    
    lettersInWord = choosenWord.split('');
    
    //create the number of blanks
    
    numBlanks = lettersInWord.length;
	
	//Sets options to reset to
    
    letterGuessed = 0;
	rightGuessCounter = 0;
	guessesLeft = 10;
	wrongLetters =[];
	blanksAndSuccesses =[];
	doubleWord = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
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
	numBlanks = lettersInWord.length;
	
	//Reset Function
	//===========================================================
	rightGuessCounter = 0;
	guessesLeft = 10;
	wrongLetters =[];
	blanksAndSuccesses =[];
	doubleWord = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

	//fill blanks created by function
	for(var i = 0; i< numBlanks; i++)
	{
		blanksAndSuccesses.push('_');
		document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses;
	}

	//Pushes to HTML during game
	document.getElementById('wordToGuess').innerHTML = blanksAndSuccesses.join(' ');
	document.getElementById('numGuesses').innerHTML = guessesLeft;
	document.getElementById('winCounter').innerHTML = winCount;
	document.getElementById('lossCounter').innerHTML = loseCount;
    document.getElementById('wrongGuesses').innerHTML = wrongLetters;
    
	console.log(choosenWord);
	console.log(lettersInWord);
	console.log(numBlanks);
	console.log(blanksAndSuccesses);
}

function compareLetters(userKey)
{
				console.log('Code is working');
				//If user key exist in choosen word then perform this function 
				if(choosenWord.indexOf(userKey) > -1)
				{
					//Loops depending on the amount of blanks 
					for(var i = 0; i < numBlanks; i++)
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
				//Incorrect guesses
				else
				{
					wrongLetters.push(userKey);
					guessesLeft--;

					//Changes HTML
					document.getElementById('numGuesses').innerHTML = guessesLeft;
					document.getElementById('wrongGuesses').innerHTML = wrongLetters;
				
					console.log('Wrong Letters = ' + wrongLetters);
					console.log('Guesses left are ' + guessesLeft);
				}
			
// declare winloss function to recall at end of game
		
}
function winOrLoss()
{
	// When number blanks if filled with correct letters, then alert player of win++
	if(rightGuessCounter === numBlanks)
	{
		// Win count F=function, increases wins by 1 each time (++)
		winCount++;
		//Changes HTML
		document.getElementById('winCounter').innerHTML = winCount;
		alert(" You win! You're the best that ever was!");

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

	for(var i = 0; i < doubleWord.length; i++)
	{	
		if(letterGuessed === doubleWord[i] && test === true)
		{
			var spliceWord = doubleWord.splice(i,1);
			

			console.log('Double word is = ' + doubleWord[i])
			console.log('Spliced Word is = ' + spliceWord);

			compareLetters(letterGuessed);

			// Call win or loss function

			winOrLoss();
		}
	}		
		
}