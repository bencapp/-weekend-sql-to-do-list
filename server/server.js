//         SERVER SETUP
// --------------------------- //
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("server/public"));

// DATABASE CONNECTION SETUP
const pg = require("pg");

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "weekend-to-do-app",
});

//        GET ENDPOINT
// --------------------------- //
app.get("/list", (req, res) => {
  let queryText = `SELECT * FROM "toDoList"`;
  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log("GET request failed", error);
      res.sendStatus(500);
    });
});

//        POST ENDPOINT
// --------------------------- //

//         PUT ENDPOINT
// --------------------------- //

//       DELETE ENDPOINT
// --------------------------- //

//         PORT SETUP
// --------------------------- //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running, ready for access at", PORT);
});
