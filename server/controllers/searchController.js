const { addURLToGame } = require("../utils/response-helper");

const igdb = require("igdb-api-node").default;

const searchForGames = async (req, res) => {
  const game = req.query.game;
  const limit = Number(req.query.limit) || 20;

  const client = igdb(process.env.TWITCH_CLIENT_ID, req.headers.authorization);
  const response = await client
    .fields(
      "name, id, platforms.name, platforms.category, cover.image_id, release_dates, screenshots.url, screenshots.image_id"
    )
    .where("version_parent = null & category = 0 & platforms.category != (2,3)")
    .search(game)
    .limit(limit)
    .request("/games");

  let games = [];
  for (const g of response.data) {
    let gameWithImage = addURLToGame(g);
    games.push(gameWithImage);
  }
  // response.data = addURLToGame(response.data);

  res.json({
    records: response.data.length,
    results: games,
  });
};

module.exports = { searchForGames };
