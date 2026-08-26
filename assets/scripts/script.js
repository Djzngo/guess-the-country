const API_URL = "https://api.restcountries.com/countries/v5?region=europe"
const API_KEY = "Bearer rc_live_79b6961d3d694fd19986cb45e54a3983";

document.getElementById("btnStart").addEventListener("click", (e) => startGame(e));
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
        console.log(data);
        rndCountry(data);
        
    }
    else {
        throw new Error(data.error);
    }
}

function startGame (e) {

    //Disables start button and enables restart button
    btnControl();

    // Runs through each key in object and sets their values to an empty array
    Object.keys(game).forEach((i) => {
        game[i] = [];
    });
    // Set game guesses value to 0, and answer to null
    game.guesses = 0;
    game.answer = null;

    getRequest(e);

}

// push country data to arrays within game object
function rndCountry(data) {
    const array = data;
    let countries = game.country;
    let region = game.region;
    let currency = game.currency;

    for (let i = 0; i <= 10; i++) {
        countries.push(array.data.objects[i].names.common);
        region.push(array.data.objects[i].region);
        // If coutry does not have currency listed push 'N/A' in its place
        if (array.data.objects[i].currencies[0] == undefined){
            currency.push("N/A");
        }
        else {
            currency.push(array.data.objects[i].currencies[0].code);
        }
        console.log(game);
    }
}

function userSubmit() {
    let guess = document.getElementById("txtGuess").innerText;
    
    if (guess != game.answer) {
        game.guesses += 1;
        showGuesses();
        console.log(game.guesses);
    }

    
}

function showGuesses() {
    document.getElementById("guessCount").innerText = game.guesses;
}

function gameRestart() {

}

function btnControl() {
    var start = document.getElementById("btnStart");
    var restart = document.getElementById("btnRestart");
    var submit = document.getElementById("btnSubmit");

    //disables start button. Enables restart, and submit if start is disabled.
    if (start.disabled != true) {
        start.disabled = true;
        restart.disabled = false;
        submit.disabled = false;
    }

}

// module.exports = { game, startGame, userSubmit };