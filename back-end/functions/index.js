const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const getRandomMessage = require("./services/randomMessages").getRandomMessage;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/messages", (_, response) => {
  response.send(getRandomMessage());
});

exports.messages = functions.https.onRequest(app);
