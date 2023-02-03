//         SERVER SETUP
// --------------------------- //
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Serve back static files by default
app.use(express.static("server/public"));

//         PORT SETUP
// --------------------------- //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running, ready for access at", PORT);
});
