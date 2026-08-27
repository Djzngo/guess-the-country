const API_URL = "https://api.restcountries.com/countries/v5?limit=100&region=europe"
const API_KEY = "Bearer rc_live_79b6961d3d694fd19986cb45e54a3983";

document.getElementById("btnStart").addEventListener("click", (e) => startGame(e));
document.getElementById("btnRestart").addEventListener("click", () => gameRestart());
document.getElementById("btnSubmit").addEventListener("click", () => userSubmit())

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

// Hides start button on click to prevent multiple GET requests being made. Enables btnRestart, and btnSubmit
$("#btnStart").on("click", function() {
    $("#btnStart").hide("slow", function(){
        $("#btnRestart, #btnSubmit")
    });
});

// //Request for information from API
async function getRequest(e) {
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
        
    }
    else {
        throw new Error(data.error);
    }
}

function startGame (e) {

    // Runs through each key in object and sets their values to an empty array
    Object.keys(game).forEach((i) => {
        game[i] = [];
    });
    // Set game guesses value to 0, and answer to null
    game.guesses = 0;
    game.answer = null;

    //Runs API for country data.
    getRequest(e);

}

// Empties answers object, and select a new country to guess
function gameRestart() {
    game.guesses = 0;
    showGuesses();
    

    Object.keys(answers).forEach((i) => {
        answers[i] = null;
    });

    selectCountry();

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

function userSubmit() {
    let guess = document.getElementById("txtGuess").innerText;
    let answer = answers.country
    
    if (guess != answer) {
        game.guesses += 1;
        showGuesses();
    }
    else {
        console.log("correct")
    }

    
}

function showGuesses() {
    document.getElementById("guessCount").innerText = game.guesses;
}

// module.exports = { game, startGame, userSubmit };