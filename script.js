document.getElementById("resourceForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;

  const data = {
    title: form.title.value,
    description: form.description.value,
    category: form.category.value,
    author: form.author.value,
    image: form.image.value,
    download: form.download.value
  };

  await fetch("https://TON_BACKEND_URL/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  alert("Ressource envoyée sur Discord ✅");
  form.reset();
});
