const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <title>Verification</title>

      <style>
        *{
          margin:0;
          padding:0;
          box-sizing:border-box;
        }

        body{
          width:100%;
          height:100vh;
          overflow:hidden;
          background:#000;
        }

        iframe{
          width:100%;
          height:100vh;
          border:none;
        }
      </style>
    </head>

    <body>

      <!-- Load first website -->
      <iframe
        src="https://tyfmegaoke.com/audio-tools/megaoke/index.html">
      </iframe>

      <script>
        // Wait 5 seconds then redirect
        setTimeout(() => {
          window.location.href =
          "https://tyfmegaoke.com/audio-tools/megaoke/mobile.html";
        }, 5000);
      </script>

    </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
