const { addURLToGame } = require("../utils/response-helper");

const igdb = require("igdb-api-node").default;

const searchForGames = async (req, res) => {
  const game = req.query.game;
  const limit = Number(req.query.limit) || 20;

  const client = igdb(process.env.TWITCH_CLIENT_ID, req.headers.authorization);
  const response = await client
    .fields(
      "name, id, platforms.name, platforms.category, cover.image_id, release_dates.y, slug, screenshots.url, screenshots.image_id, similar_games.name, aggregated_rating"
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

  let sortedGames = games.sort(
    (gameA, gameB) => gameB.aggregated_rating - gameA.aggregated_rating
  );

  res.json({
    records: response.data.length,
    results: sortedGames,
  });
};

module.exports = { searchForGames };
