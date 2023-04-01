const express = require("express");
const igdb = require("igdb-api-node").default;
const { getGameByID } = require("../controllers/gamesController");
const router = express.Router();

router.get("/", async (req, res) => {
  // TODO: Implement server-side pagination for API call
  const client = igdb(process.env.TWITCH_CLIENT_ID, req.headers.authorization);
  const response = await (
    await client.fields(["*"]).where("version_parent = null").request("/games")
  ).data;
  res.json(response);
});

router.get("/:id", getGameByID);

module.exports = router;
