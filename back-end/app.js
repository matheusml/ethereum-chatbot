const express = require("express"),
  bodyParser = require("body-parser");

const getRandomMessage = require("./services/randomMessages").getRandomMessage;

const app = express();

app.use(bodyParser.json());

app.post("/messages", (_, response) => {
  response.send(getRandomMessage());
});

app.listen(3000);
