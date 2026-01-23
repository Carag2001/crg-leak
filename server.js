const express = require("express");
const sendDiscord = require("./sendDiscord");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/add", (req, res) => {
  sendDiscord(req.body);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log("Backend lancé sur le port " + PORT);
});
