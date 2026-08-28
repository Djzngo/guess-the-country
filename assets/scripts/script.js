const API_URL = "https://api.restcountries.com/countries/v5?limit=100&region=europe"
const API_KEY = "Bearer rc_live_79b6961d3d694fd19986cb45e54a3983";

let game = {
    guesses: 0,
    country: [],
    region: [],
    currency: [],
}

let answers = {
    country: "",
    region: "",
    currency: "",
}

// Start button on click functions
$("#btnStart").on("click", function() {
    startGame();
});

// Empties answers object, and select a new country to guess
$("#btnRestart").on("click", function() {
    game.guesses = 0;

    // Empties all data in answer object
    Object.keys(answers).forEach((i) => {
        answers[i] = null;
    });

    selectCountry();

    // Resets guess counter
    $("#guessCount").text(game.guesses);
});

//Compares user guess and stored answer.
$("#btnSubmit").on("click", function() {
    let guess = $("#txtguess").val().toUpperCase();
    let answer = new String(answers.country).toUpperCase();

    if (guess === answer) {
        alert("Well done, you have entered the correct answer!");
    }
    else {
        game.guesses += 1;
        $("#guessCount").text(game.guesses);
        alert("Try again.");
    }
});

//Request for information from API
async function getRequest() {
    const response = await fetch(
      API_URL,
      {
        headers: {
          Authorization: API_KEY,
        },
      },
    );

    const data = await response.json();

    if (response.ok) {
        generateCountry(data);
        selectCountry();
        // Hides & disables start button on click to prevent multiple GET requests being made. Enables btnRestart, and btnSubmit
        $("#btnStart").prop("disabled", true).hide("fast", function() {
            $("#btnRestart, #btnSubmit").prop("disabled", false);
        });
    }
    else {
        throw new Error(data.error);
    }
}
// Initialises game start.
function startGame () {

    // Runs through each key in object and sets their values to an empty array
    Object.keys(game).forEach((i) => {
        game[i] = [];
    });
    // Set game guesses value to 0, and answer to null
    game.guesses = 0;
    game.answer = null;

    //Runs API for country data.
    getRequest();

}

// Selects a random country from game.country array to be placed in answers.country
function selectCountry() {
    let rndNum = Math.floor(Math.random() * 53);

    answers.country = game.country[rndNum];
    answers.region = game.region[rndNum];
    answers.currency = game.currency[rndNum];
}

// push country data to arrays within game object
function generateCountry(data) {
    const array = data;
    let countries = game.country;
    let region = game.region;
    let currency = game.currency;

    for (let i = 0; i <= 53; i++) {
        countries.push(array.data.objects[i].names.common);
        region.push(array.data.objects[i].region);
        // If coutry does not have currency listed push 'N/A' in its place
        if (array.data.objects[i].currencies[0] == undefined){
            currency.push("N/A");
        }
        else {
            currency.push(array.data.objects[i].currencies[0].code);
        }
    };
}

// module.exports = { game, startGame, userSubmit };