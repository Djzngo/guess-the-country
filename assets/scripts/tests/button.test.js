/**
 * @jest-environment jsdom
 */

// Points to script used for testing.
const { game, startGame, userSubmit } = require("../script")

//Pulls elements from the DOM
beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf-8');
    document.body.innerHTML = fileContents;
 });

// testing object keys
describe("game object to contain the correct keys", () => {
    test("guesses to be true", () => {
        expect("guesses" in game).toBe(true);
    });
    test("country to be true", () => {
        expect("country" in game).toBe(true);
    });
    test("region to be true", () => {
        expect("region" in game).toBe(true);
    });
    test("currency to be true", () => {
        expect("currency" in game).toBe(true);
    });
    test("answer to be true", () => {
        expect("answer" in game).toBe(true);
    });
});

//Start game button testing
describe("testing of start game button", () => {
    test("when start game is called set guess value to null", () => {
        expect(game.guesses).toEqual(0)
    });
    
});

//Submit testing
describe("testing user submission response", () => {
    test("when user submits guess, compare with selected country", () => {
        expect(userSubmit.guess != game.answer);
    });
});