const API_URL = "https://api.restcountries.com/countries/v5?limit=100&region=europe"
const API_KEY = "Bearer rc_live_79b6961d3d694fd19986cb45e54a3983";

let game = {
    guesses: 0,
    country: [],
    region: [],
    currency: [],
    longitude: [],
    latitude: [],
}

let answers = {
    country: "",
    region: "",
    currency: "",
    longitude: "",
    latitude: "",
}

// Start button on click functions
$("#btnStart").on("click", function() {
    startGame();
    $("#loadingStart").show("fast").attr("style", "display: inline-block");
});

// Empties answers object, and select a new country to guess
$("#btnRestart").on("click", function() {
    game.guesses = 0;

    // Empties all data in answer object
    Object.keys(answers).forEach((i) => {
        answers[i] = null;
    });

    selectCountry();

    // Resets indicators
    $("#guessCount").text("Guesses: " + game.guesses);
    $("#txtRegion").text("-");
    $("#txtCurrency").text("-");
    $("#txtLatitude").text("-");
    $("#txtLongitude").text("-");
    // Hides help buttons
    $("#btnRegion").slideUp("slow");
    $("#btnCurrency").slideUp("slow");
});

//Compares user guess and stored answer.
$("#btnSubmit").on("click", function() {
    let guess = $("#txtGuess").val().toUpperCase();
    let answer = new String(answers.country).toUpperCase();

    // Checks users guess against answer
    if (guess === answer) {
        alert("That's correct! Well done!");
    }
    else {
        game.guesses += 1;
        $("#guessCount").text("Guesses: " + game.guesses);
    }

    if (game.guesses === 10) {
        $("#btnRegion").slideDown("slow").attr("style", "display: inline-block");
    }
    else if (game.guesses === 15) {
        $("#btnCurrency").slideDown("slow").attr("style", "display: inline-block");
    }
});

// Runs #btnSubmit click event on 'Enter' keypress within input field
$("#txtGuess").on("keypress", function(event) {
    if (event.key === "Enter") {
        $("#btnSubmit").trigger("click");
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
        // Hides & disables start button on click to prevent multiple GET requests being made. Enables btnRestart, btnSubmit, and input field.
        $("#btnStart").prop("disabled", true).hide("fast", function() {
            $("#btnRestart, #btnSubmit, #txtGuess").prop("disabled", false);
        });
        $("#loadingStart").hide("fast");
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
    answers.longitude = game.longitude[rndNum];
    answers.latitude = game.latitude[rndNum];
}

// push country data to arrays within game object
function generateCountry(data) {
    const array = data;
    let countries = game.country;
    let region = game.region;
    let currency = game.currency;
    let longitude = game.longitude;
    let latitude = game.latitude;

    for (let i = 0; i <= 53; i++) {
        countries.push(array.data.objects[i].names.common);
        region.push(array.data.objects[i].region);
        longitude.push(array.data.objects[i].coordinates.lng);
        latitude.push(array.data.objects[i].coordinates.lat);

        // If coutry does not have currency listed push 'N/A' in its place
        if (array.data.objects[i].currencies[0] == undefined){
            currency.push("N/A");
        }
        else {
            currency.push(array.data.objects[i].currencies[0].code);
        }
    };
}

//Jest Exports
// module.exports = { game, startGame, userSubmit };