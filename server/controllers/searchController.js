const { addURLToGame } = require("../utils/response-helper");

const igdb = require("igdb-api-node").default;

const searchForGames = async (req, res) => {
  const game = req.query.game;
  const limit = Number(req.query.limit) || 20;

  const client = igdb(process.env.TWITCH_CLIENT_ID, req.headers.authorization);
  const response = await client
    .fields(
      "name, id, platforms.name, platforms.category, cover.image_id, release_dates"
    )
    .where("version_parent = null & category = 0 & platforms.category != (2,3)")
    .search(game)
    .limit(limit)
    .request("/games");

  response.data = addURLToGame(response.data);

  res.json({
    records: response.data.length,
    results: response.data,
  });
};

module.exports = { searchForGames };
