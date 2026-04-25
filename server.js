const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/proxy", async (req, res) => {
  try {
    let url = req.query.url;

    if (!url) {
      return res.send("No URL");
    }

    if (!url.startsWith("http")) {
      url = "https://" + url;
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      }
    });

    const text = await response.text();
    res.send(text);

  } catch (err) {
    res.send("Error cargando página");
  }
});

// 🔥 CLAVE PARA RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Proxy activo en puerto " + PORT);
});