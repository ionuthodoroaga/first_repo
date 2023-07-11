#!/usr/bin/env node
const axios = require("axios");

const BASE_PATH = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = "<your key here>";

const prompt = (message, callback) => {
  const stdin = process.stdin;
  const stdout = process.stdout;

  stdin.resume();
  stdout.write(message);

  stdin.once("data", (data) => {
    callback(data.toString().trim());
  });
};

prompt("Enter a location or a postal code: ", function (location) {
  if (!location) {
    console.log("Please try again");
    process.exit();
  }

  axios
    .get(`${BASE_PATH}?q=${location}&units=imperial&appid=${API_KEY}`)
    .then((response) => {
      const weather = response;
      const message = `\nCurrent date and time: ${weather.headers.date}\nIt's ${weather.data.main.temp} degrees in ${location}.`;

      console.log(message);
      process.exit();
    })
    .catch((err) => {
      console.log(`Error: ${err.response.data.message}`);
      process.exit();
    });
});