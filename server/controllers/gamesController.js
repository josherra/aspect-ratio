const { addURLToGame } = require("../utils/response-helper");

const igdb = require("igdb-api-node").default;

const getGameByID = async (req, res) => {
  const id = req.params.id;

  const client = igdb(process.env.TWITCH_CLIENT_ID, req.headers.authorization);
  let response = await client
    .fields([
      "id, name, cover.image_id, collection.name, platforms.name, screenshots.url, screenshots.image_id",
    ])
    .where(`id=${id}`)
    .request("/games");

  let game = addURLToGame(response.data[0]);
  res.json(game);
};

module.exports = {
  getGameByID,
};
