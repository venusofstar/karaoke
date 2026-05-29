const express = require("express");
const https = require("https");

const app = express();

const PORT = process.env.PORT || 3000;

// Proxy mobile.html using custom headers
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

    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {

      // Show loading screen first
      res.send(`
        <!DOCTYPE html>
        <html>
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
            }

            iframe{
              position:fixed;
              top:0;
              left:0;
              width:100%;
              height:100vh;
              border:none;
            }

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
              z-index:9999;
              color:#fff;
              font-family:Arial,sans-serif;
            }

            .loader{
              width:60px;
              height:60px;
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
          </style>
        </head>

        <body>

          <iframe id="frame"></iframe>

          <div id="loading">
            <div class="loader"></div>
            <h2>Loading...</h2>
          </div>

          <script>

            // Inject proxied page
            const html = \`${data
              .replace(/`/g, "\\`")
              .replace(/\$/g, "\\$")}\`;

            const iframe =
              document.getElementById("frame");

            iframe.srcdoc = html;

            // Hide loading after 5 sec
            setTimeout(() => {
              document.getElementById("loading")
                .style.display = "none";
            }, 5000);

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
