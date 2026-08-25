/**
 * @jest-enviroment jsdom
 */

// Points to script used for testing.
const { game } = require("../script")

//Pulls elements from the DOM
beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('testing.html', 'utf-8');
    document.body.innerHTML = fileContents;
 });

// testing object keys
describe("game object to contain the correct keys", () => {
    test("guesses to be true", () => {
        expect("guesses" in game).toBe(true);
    });
})