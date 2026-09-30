# Guess the Country (Game)

This is a random country guessing game designed to test your geography skills.

Game is designed to show my JavaScript ability with use of APIs.

Repository [Link](https://github.com/Djzngo/guess-the-country)

Live Site [Link](https://djzngo.github.io/guess-the-country/)

---

## Table of Contents

1. [Project Purpose](#project-purpose)
2. [User Experience (UX)](#user-experience-ux)
	1. [Strategy](#strategy)
	2. [Scope](#scope)
	3. [Structure](#structure)
	4. [Skeleton](#skeleton)
	5. [Surface](#surface)
3. [Features](#features)
4. [Technologies Used](#technology-used)
5. [Testing](#testing)
6. [Credits](#credits)

---

## Project Purpose

Random generated country guessing game, for users to test their geography skills. 
The game will have unlimited amounts of attempts to guess the country but will have a guess counter for the user to know how many attempts it took for them to get the correct answer.

The game with only being using Europe as its region. This is because the API I am using only allows you to pull 100 countries at a time.

## User Experience (UX)

### Strategy

#### Site Goals

- Fun game for user to test geography skills
- web-based application that uses JavaScript as its main language to function.

#### External User's Goals

- Somewhere for me to be able to test my knowledge on countries from around the world.

### User Stories

---

## Testing

### Validator Results

| Page | HTML (W3C) |
| --- | --- |
| index.html | [Click me](assets/readme/index-validator.png) |
| game.html | [Click me](assets/readme/game-validator.png) |

[CSS Validation](assets/readme/css-validator.png)

### Manual Testing

| Feature | Test | Expected | Actual | Result |
|---|---|---|---|---|
| Main navigation | Clicked every navigation link from every page | The correct page loads each time | As expected | Pass |
| Current page indicator | Visited each page in turn | The current page is marked in the navigation | As expected | Pass |
| Navigation toggle | Responsive design, collapses on smaller screens | The toggle appears and the menu expands and collapses | As expected | Pass |
| Logo link | Clicked the logo from every page | Returns to the home page | As expected | Pass |
| External links | Clicked all threee social links | Each opens in a new tab, leaving the site open | As expected | Pass |

---

## Credits

### Code
 
| Source | Used for | Location in project |
|---|---|---|
| [Bootstrap 5 documentation — Navbar](https://getbootstrap.com/docs/5.3/components/navbar/) | Responsive navigation bar structure and toggle. Some elements remove to align with the design of this website. | Header of all webpages |
| [Bootstrap 5](https://getbootstrap.com/) | Grid system, , and utility classes throughout | All pages |
| [jQuery](https://jquery.com/) | All the JS on this page | Game webpage |
| [Jest](https://jestjs.io/) | Testing code | within assets/scripts/tests folder |

### Content

All content writen on this website is all done by me.

Any graphics have been done by myself, if not they're credited in the next section of this doc.

### Media

| Assets | Creator | Source
|---|---|---|
| favicon.ico | Created by me | Created using 'Photopea'
| GTC-logo-two.png | Created by me | Created using 'Photopea'
| correct-tick.png | Free to use | www.magnific.com (Lincense: Free)
| incorrect-cross.png | Free to use | www.magnific.com (Lincense: Free)
| reaction-go.png | Free to use | www.magnific.com (Lincense: Free)
| unlock.png | Free to use | www.magnific.com (Lincense: Free)
| The_World_map.png | Free to use | https://commons.wikimedia.org/wiki/File:The_World_map.png