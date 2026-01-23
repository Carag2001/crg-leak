// server.js

const express = require("express");
const sendDiscord = require("./sendDiscord");

const app = express();
app.use(express.json());

app.post("/add", (req, res) => {
  sendDiscord(req.body);
  res.sendStatus(200);
});

app.listen(3000);
