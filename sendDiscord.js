const fetch = require("node-fetch");
const CONFIG = require("./config");

async function sendDiscord(data) {
  const webhook = CONFIG.webhooks[data.category];
  if (!webhook) return;

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: data.title,
          description: data.description,
          color: CONFIG.embed_color,
          image: {
            url: data.image
          },
          fields: [
            { name: "👤 Auteur", value: data.author, inline: true },
            { name: "📂 Catégorie", value: data.category, inline: true },
            { name: "🔗 Téléchargement", value: `[Clique ici](${data.download})` }
          ],
          footer: { text: CONFIG.site_name },
          timestamp: new Date()
        }
      ]
    })
  });
}

module.exports = sendDiscord;
