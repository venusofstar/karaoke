// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(__dirname));

// Verification route
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Verification</title>
      <meta charset="UTF-8" />
      <meta http-equiv="refresh" content="3;url=https://tyfmegaoke.com/audio-tools/megaoke/mobile.html">
      <style>
        body{
          margin:0;
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          background:#000;
          color:#fff;
          font-family:Arial,sans-serif;
          flex-direction:column;
        }

        h1{
          font-size:28px;
          margin-bottom:10px;
        }

        p{
          opacity:.8;
        }
      </style>
    </head>
    <body>
      <h1>Verification Success</h1>
      <p>Redirecting in 3 seconds...</p>

      <script>
        setTimeout(() => {
          window.location.href =
            "https://tyfmegaoke.com/audio-tools/megaoke/mobile.html";
        }, 3000);
      </script>
    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});
