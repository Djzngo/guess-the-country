const API_URL = "https://api.restcountries.com/countries/v5?limit=100&region=europe";
const API_KEY = "Bearer rc_live_79b6961d3d694fd19986cb45e54a3983";

let game = {
    guesses: 0,
    country: [],
    region: [],
    currency: [],
    longitude: [],
    latitude: [],
};

let answers = {
    country: "",
    region: "",
    currency: "",
    longitude: "",
    latitude: "",
};

let comparison = {
    country: "",
    region: "",
    currency: "",
    longitude: "",
    latitude: "",
};

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

    $("#btnRestart").slideUp("slow");
    $("#txtGuess").val("");
    $("#btnSubmit, #txtGuess, #btnNew").prop("disabled", false);
});

//Compares user guess and stored answer.
$("#btnSubmit").on("click", function() {
    let guess = $("#txtGuess").val().toUpperCase();
    let answer = answers.country.toUpperCase();

    compareGuess();

    // Checks users guess against answer
    if (guess === answer) {
        alert(`That's correct! Well done! \nAnswer: ${answers.country}`);

        $("#txtRegion").text(answers.region);
        $("#txtCurrency").text(answers.currency);
        $("#txtLatitude").text(answers.latitude);
        $("#txtLongitude").text(answers.longitude);

        // Disables input field and submit button, and reveals restart button
        $("#btnRestart").slideDown("slow").attr("style", "display: inline-block");
        $("#btnSubmit, #txtGuess, #btnNew").prop("disabled", true);
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

// Reveals the region of the answer when clicked
$("#btnRegion").on("click", function() {
    $("#txtRegion").text(answers.region);
});

// Reveals the currency of the answer when clicked
$("#btnCurrency").on("click", function() {
    $("#txtCurrency").text(answers.currency);
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
        // Hides & disables start button on click to prevent multiple GET requests being made. Enables btnNew, btnSubmit, and input field.
        $("#btnStart").prop("disabled", true).hide("fast", function() {
            $("#btnNew, #btnSubmit, #txtGuess").prop("disabled", false);
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
    }
}

// Compares user guess to answer, and stores the values of the guessed country in comparison object.
function compareGuess() {
    // Converts user input to uppercase for comparison
    let x = $("#txtGuess").val().toUpperCase();

    //Loops through game.country array. Once match is found with user input take index of match, and use that to define the other values in comparison object.
    game.country.forEach((i) => {
        let y = game.country.indexOf(i);

        if (x === i.toUpperCase()) {
            comparison.country = game.country[y];
            comparison.region = game.region[y];
            comparison.currency = game.currency[y];
            comparison.longitude = game.longitude[y];
            comparison.latitude = game.latitude[y];
        }
    });

    lngLatDiff();

}

// Calculates the difference between the guessed country and the answer, and displays it in the HTML.
function lngLatDiff() {
    let a = comparison.longitude - answers.longitude;
    let b = comparison.latitude - answers.latitude;

    $("#txtLongitude").text(a.toFixed(2));
    $("#txtLatitude").text(b.toFixed(2));
}



//Jest Exports
// module.exports = { game, startGame, userSubmit };