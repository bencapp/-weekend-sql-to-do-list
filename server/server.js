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
  const queryText = `SELECT * FROM "toDoList" ORDER BY "id"`;
  pool
    .query(queryText)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((error) => {
      console.log("GET request failed:", error);
      res.sendStatus(500);
    });
});

//        POST ENDPOINT
// --------------------------- //
app.post("/list", (req, res) => {
  const queryText = `
        INSERT INTO "toDoList" (task)
        VALUES ($1)
    `;
  const queryParams = [req.body.task];

  pool
    .query(queryText, queryParams)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("POST request failed:", error);
      res.sendStatus(500);
    });
});

//         PUT ENDPOINT
// --------------------------- //
app.put("/list/:id", (req, res) => {
  const queryText = `
          UPDATE "toDoList" SET "completed" = $1
          WHERE id = $2;
      `;

  const queryParams = [req.body.completed, req.params.id];

  pool
    .query(queryText, queryParams)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("PUT request failed:", error);
      res.sendStatus(500);
    });
});

//       DELETE ENDPOINT
// --------------------------- //
app.delete("/list/:id", (req, res) => {
  const queryText = `
            DELETE FROM "toDoList"
            WHERE id = $1;
        `;

  const queryParams = [req.params.id];

  pool
    .query(queryText, queryParams)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log("DELETE request failed:", error);
      res.sendStatus(500);
    });
});

//         PORT SETUP
// --------------------------- //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server running, ready for access at", PORT);
});
