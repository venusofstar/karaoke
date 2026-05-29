const express = require("express");
const https = require("https");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {

  const options = {
    hostname: "tyfmegaoke.com",
    path: "/audio-tools/megaoke/mobile.html",
    method: "GET",
    headers: {
      "Referer":
        "https://tyfmegaoke.com/audio-tools/megaoke/index.html",

      "Origin":
        "https://tyfmegaoke.com",

      "User-Agent":
        "Mozilla/5.0"
    }
  };

  const proxy = https.request(options, (response) => {

    let html = "";

    response.on("data", (chunk) => {
      html += chunk;
    });

    response.on("end", () => {

      res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<title>Loading...</title>

<style>

*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

body{
  overflow:hidden;
  background:#000;
  font-family:Arial,sans-serif;
}

iframe{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100vh;
  border:none;
}

/* LOADING OVERLAY */

#loading{
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100vh;
  background:#000;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  z-index:99999;
  color:#fff;
  transition:opacity .5s ease;
}

.loader{
  width:65px;
  height:65px;
  border:6px solid #333;
  border-top:6px solid #fff;
  border-radius:50%;
  animation:spin 1s linear infinite;
  margin-bottom:20px;
}

@keyframes spin{
  100%{
    transform:rotate(360deg);
  }
}

.hidden{
  opacity:0;
  pointer-events:none;
}

</style>
</head>

<body>

<iframe id="frame"></iframe>

<div id="loading">
  <div class="loader"></div>
  <h2>Loading...</h2>
</div>

<script>

const iframe =
document.getElementById("frame");

const loading =
document.getElementById("loading");

// Inject proxied HTML
iframe.srcdoc = \`
${html
  .replace(/`/g, "\\`")
  .replace(/\$/g, "\\$")}
\`;

// Hide loading when iframe fully loads
iframe.onload = () => {

  loading.classList.add("hidden");

  setTimeout(() => {
    loading.style.display = "none";
  }, 500);

};

</script>

</body>
</html>
      `);

    });

  });

  proxy.on("error", (err) => {
    res.send("Proxy Error: " + err.message);
  });

  proxy.end();

});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
