const express = require("express");
const path = require("path");
const sendDiscord = require("./sendDiscord");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// servir les fichiers html
app.use(express.static(path.join(__dirname, "public")));

// réception du formulaire
app.post("/add-resource", (req, res) => {
  const resource = {
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    author: req.body.author,
    image: req.body.image,
    download: req.body.download
  };

  sendDiscord(resource);

  res.send("Ressource ajoutée et envoyée sur Discord ✅");
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
