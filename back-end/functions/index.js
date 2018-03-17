const functions = require("firebase-functions");
const express = require("express");

const getRandomMessage = require("./services/randomMessages").getRandomMessage;

const app = express();

app.get("/messages", (_, response) => {
  response.send(getRandomMessage());
});

exports.messages = functions.https.onRequest(app);
