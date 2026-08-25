const API_URL = "https://api.restcountries.com/countries/v5"
const API_KEY = "Bearer rc_live_79b6961d3d694fd19986cb45e54a3983";

document.getElementById("btnStart").addEventListener("click", e => getRequest(e));

let game = {
    guesses: 40,
    country: [],
    region: [],
    currency: [],
}

//Request for information from API
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
        rndCountry(data);
    }
    else {
        throw new Error(data.error);
    }
}

function startGame () {

    // Runs through each key in object and sets their values to null
    Object.keys(game).forEach((i) => {
        game[i] = [];
    });
    // Set game guesses value to 0
    game.guesses = 0;

    // getRequest();

}

function rndCountry(data) {
    const array = data;
    let testArray = [];

    for (let i = 0; i <= 10; i++) {
        testArray.push(array.data.objects[i].names.common);
        console.log(testArray)
    }

    game.country = testArray;
}

module.exports = { game, startGame };