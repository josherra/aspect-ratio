const express = require("express");
const igdb = require("igdb-api-node").default;
const router = express.Router();

router.get("/", (req, res) => {
  res.send("General search endpoint");
});

router.post("/games", async (req, res) => {
  const { game } = req.body;
  const client = igdb(process.env.TWITCH_CLIENT_ID, req.headers.authorization);
  const response = await await client
    .fields(["name", "id", "platforms.name"])
    .where("version_parent = null")
    .search(game)
    .limit(20)
    .request("/games");
  res.json({
    records: response.data.length,
    results: [response.data],
  });
});

module.exports = router;
