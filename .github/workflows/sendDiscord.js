const fetch = require("node-fetch");
const CONFIG = require("./config");

async function sendDiscord(resource) {
  const webhook = CONFIG.webhooks[resource.category];

  if (!webhook) return;

  await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: resource.title,
          description: resource.description,
          color: CONFIG.embed_color,
          image: {
            url: resource.image
          },
          fields: [
            { name: "👤 Auteur", value: resource.author, inline: true },
            { name: "📂 Catégorie", value: resource.category, inline: true },
            { name: "🔗 Téléchargement", value: `[Clique ici](${resource.download})` }
          ],
          footer: {
            text: CONFIG.site_name
          },
          timestamp: new Date()
        }
      ]
    })
  });
}

module.exports = sendDiscord;
