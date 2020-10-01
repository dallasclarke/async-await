1.
// Here are 3 functions that return promises
// 1st function creates a random number and refactors the name
// 2nd function decides the level of the user
// 3rd function gives hit points and strength of user based on level
// Using async await....create a function called login, that takes a name and email
// Success from the function will log a string using values from all 3 functions
// Successful String Output: '<name from loginUser> is an <level> player with <strength> strength and <hitPoint> hit points.'
// Failed String Output: 'User Not Logged in'

// Except for loginUser, calling a function requires a value from the previous function
// Do not edit loginUser, level or levelPower except to test the error variable
// log the error message in your function so that it shows the message if reject has been called

const loginUser = (name) => {
  return new Promise((resolve, reject) => {
    const error = false;
    let random = Math.floor(Math.random() * 98);

    error
      ? reject('User Not logged in')
      : resolve({ name: `The ${name}-Meister`, random });
  });
};

let level = (levelNumber) => {
  return new Promise((resolve, reject) => {
    levelNumber === 0
      ? reject('User had no power and is expired')
      : levelNumber < 32
      ? resolve('amateur')
      : levelNumber < 65
      ? resolve('intermediate')
      : resolve('advanced');
  });
};

let levelPower = (level) => {
  return new Promise((resolve, reject) => {
    return 'advanced'
      ? resolve({ hitPoints: 200, strength: 10 })
      : 'intermediate'
      ? resolve({ hitPoints: 100, strength: 7 })
      : resolve({ hitPoints: 70, strength: 4 });
  });
};

async function login(name, email) {
    try{
        const user = await loginUser(name);
        const userLevel = await level(user.random);
        const power = await levelPower(userLevel);
        console.log(`${user.name} is an ${userLevel} player with ${power.strength} strength and ${power.hitPoints} hit points.`)
    }
    catch(err) {
        return err;
    };
};
// login('garfunkel', 'd@me.com') // Getting same result for strength and hitpoints


// 2.
// Write an async function getUsersEmails
// Using fetch, it should call the given url
const url1 = 'https://randomuser.me/api/?results=10';
// log out a list of User Emails
// OUTPUT
// Email List:

// craig.odonoghue@example.com
// ferdinanda.farias@example.com
// isabella.horton@example.com
// alessandro.rink@example.com
// giulia.daconceicao@example.com
// yolanda.nieto@example.com
// sander.thomsen@example.com
// damien.dupont@example.com
// isabella.carroll@example.com
// jake.owens@example.com
const fetch = require('node-fetch');

async function getUsersEmails(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const emails = await data.results.forEach(({email}) => console.log(`Email: ${email}`))

  }
  catch(err) {
    console.log(err);
  }
}
// getUsersEmails(url1);

// 3.
// Write an async function getFilms
// using axios, it should call the given url
let url = 'https://ghibliapi.herokuapp.com/films';
// Function should randomly choose one of the objects from your api call
// and log the title as well as the classification and name from the last url in the species array
// study the data to figure out your solution
// Output will be random but format it like the EXAMPLE OUTPUT below
// EXAMPLE OUTPUT:
// Title: Whisper of the Heart
// Classification: Mammal
// Name: Human
const axios = require('axios');

async function getFilms(url) {
  let random = Math.floor(Math.random() * 21)
  try {
    const response = await axios.get(url);
    const data = await response.data[random];
    const species = data.species.join();
    const newData = await axios.get(species);
    const speciesData = await newData.data;

    let {title} = data
    let {classification, name} = speciesData

    console.log(`Output:
    Title: ${title}
    Classification: ${classification}
    Name: ${name}
    `)
  }
  catch(err) {
    console.log(err);
  }
};
getFilms(url);