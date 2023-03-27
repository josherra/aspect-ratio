const express = require("express");
const igdb = require("igdb-api-node").default;
const router = express.Router();

router.get("/", async (req, res) => {
  const client = igdb(process.env.TWITCH_CLIENT_ID, req.headers.authorization);
  const response = await (
    await client.fields(["*"]).sort("id").limit(500).request("/platforms")
  ).data;
  res.json(response);
});

module.exports = router;
