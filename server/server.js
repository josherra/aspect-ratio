const express = require("express");
const igdb = require("igdb-api-node").default;
const cors = require("cors");
const checkAccessToken = require("./middleware/accessToken");

// Import env variables
require("dotenv").config();

// Setup express application
const app = express();
const port = 8000;

// Middlware
app.use(cors());
app.use(express.json());

app.get("/api/games", checkAccessToken, async (req, res) => {
  const client = igdb(process.env.TWITCH_CLIENT_ID, req.headers.authorization);
  const response = await (
    await client.fields(["*"]).where("version_parent = null").request("/games")
  ).data;
  res.json(response);
});

app.get("/api/");

app.post("/api/search", checkAccessToken, async (req, res) => {
  const client = igdb(process.env.TWITCH_CLIENT_ID, req.headers.authorization);
  const response = await await client
    .fields(["name", "id", "platforms.name"])
    .where("version_parent = null")
    .search(req.body.game)
    .request("/games");
  res.json(response.data);
});

// Listening for calls
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
