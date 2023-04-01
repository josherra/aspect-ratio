const { addURLToGame } = require("../utils/response-helper");

const igdb = require("igdb-api-node").default;

const getGameByID = async (req, res) => {
  const id = req.params.id;

  const client = igdb(process.env.TWITCH_CLIENT_ID, req.headers.authorization);
  let response = await (
    await client
      .fields(["id, name, cover.image_id, collection.name, platforms.name"])
      .where(`id=${id}`)
      .request("/games")
  ).data[0];

  response = addURLToGame(response);

  res.json(response);
};

module.exports = {
  getGameByID,
};
