const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const getRandomMessage = require("./services/randomMessages").getRandomMessage;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/messages", (_, response) => {
  response.json({ message: getRandomMessage(), sender: "Chatbot" });
});

exports.messages = functions.https.onRequest(app);
