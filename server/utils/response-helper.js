const addURLToGame = (game) => {
  if (game.cover) {
    game.cover.url = `https://images.igdb.com/igdb/image/upload/t_1080p/${game.cover.image_id}.jpg`;
  } else {
    game.cover = {};
    game.cover.url =
      "https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png";
  }

  return game;
};

module.exports = { addURLToGame };
