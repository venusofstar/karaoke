const express = require("express");

const app = express();

// Render provides PORT automatically
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Verification</title>
      <meta charset="UTF-8">
      <meta http-equiv="refresh" content="3;url=https://tyfmegaoke.com/audio-tools/megaoke/index.html">

      <style>
        body{
          margin:0;
          height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          flex-direction:column;
          background:#000;
          color:#fff;
          font-family:Arial,sans-serif;
        }

        h1{
          margin-bottom:10px;
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
  console.log("Server running on port " + PORT);
});
