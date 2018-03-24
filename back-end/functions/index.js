const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { SENDER } = require("./utils/constants");
const { getRandomMessage } = require("./services/messages/randomMessages");
const { ethQuery } = require("./services/ethereum/query");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/messages", (request, response) => {
  const sender = SENDER;

  if (request.body && request.body.message) {
    ethQuery(request.body.message)
      .then(message => {
        response.json({ message, sender });
      })
      .catch(() => {
        response.json({ message: getRandomMessage(), sender });
      });
  } else {
    response.json({ message: getRandomMessage(), sender });
  }
});

exports.messages = functions.https.onRequest(app);
