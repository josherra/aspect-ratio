const Catalogue = require("../models/Catalogue");

const getAllCatalogues = async (req, res) => {
  const catalogues = await Catalogue.find({});

  res.json(catalogues);
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

const addGameToCatalogue = async (req, res) => {
  try {
    const catalogueToUpdate = await Catalogue.findById(req.params.id);

    if (!catalogueToUpdate) {
      res.status(400);
      throw new Error(`Catalogue with ID of ${req.params.id} does not exist.`);
    }

    const newGame = {
      name: "Zelda",
      id: "534ertfsdgg",
    };

    const newCatalogue = await Catalogue.findByIdAndUpdate(
      req.params.id,
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

module.exports = { createNewCatalogue, getAllCatalogues, addGameToCatalogue };
