const Catalogue = require("../models/Catalogue");

/**
 * Get all catalogues.
 * @param {*} req
 * @param {*} res
 */
const getAllCatalogues = async (req, res) => {
  const catalogues = await Catalogue.find({});

  res.json(catalogues);
};

/**
 * Get the catalogue for the current user.
 * @param {*} req
 * @param {*} res
 */
const getOneCatalogue = async (req, res) => {
  const userCatalogue = await Catalogue.findOne({ user: req.user.id });

  res.json(userCatalogue);
};

/**
 * Create a new catalogue of games.
 * @param {*} req
 * @param {*} res
 */
const createNewCatalogue = async (req, res) => {
  const newCatalogue = new Catalogue({
    user: req.user.id,
    title: "This is a differentnew title",
    description: "This is the description im setting for this one",
    games: [],
  });

  await Catalogue.create(newCatalogue);

  res.json(newCatalogue);
};

/**
 * Add a game to a user's catalogue.
 * @param {*} req
 * @param {*} res
 */
const addGameToCatalogue = async (req, res) => {
  try {
    const catalogueToUpdate = await Catalogue.findOne({ user: req.user.id });
    const newGame = req.body.game;

    if (!catalogueToUpdate) {
      res.status(400);
      throw new Error(`Catalogue does not exist for user.`);
    }

    const newCatalogue = await Catalogue.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: { games: newGame },
      },
      { new: true }
    );

    res.json(newCatalogue);
  } catch (error) {
    return next(error);
  }
};

const markCatalogueInactive = async (req, res) => {
  try {
    const foundCatalogue = await Catalogue.findOne({ user: req.user.id });

    if (!foundCatalogue) {
      res.status(400);
      throw new Error(`Catalogue does not exist for user.`);
    }

    const inactiveCatalogue = await Catalogue.findOneAndUpdate(
      {
        user: req.user.id,
      },
      { active: false }
    );

    res.json(inactiveCatalogue);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createNewCatalogue,
  getAllCatalogues,
  addGameToCatalogue,
  getOneCatalogue,
};
