const Library = require("../models/Library");

/**
 * Get all libraries.
 * @param {*} req
 * @param {*} res
 */
const getAllUserLibraries = async (req, res) => {
  const libraries = await Library.find({});

  res.json(libraries);
};

/**
 * Get the library for the current user.
 * @param {*} req
 * @param {*} res
 */
const getUserLibrary = async (req, res) => {
  const userLibrary = await Library.findOne({ user: req.user.id });

  res.json(userLibrary);
};

/**
 * Create a new library of games.
 * @param {*} req
 * @param {*} res
 */
const createNewLibrary = async (req, res) => {
  const newLibrary = new Library({
    user: req.user.id,
    title: "This is a differentnew title",
    description: "This is the description im setting for this one",
    games: [],
  });

  await Library.create(newLibrary);

  res.json(newLibrary);
};

/**
 * Add a game to a user's library.
 * @param {*} req
 * @param {*} res
 */
const addGameToLibrary = async (req, res) => {
  try {
    const libraryToUpdate = await Library.findOne({ user: req.user.id });
    const newGame = req.body.game;

    if (!libraryToUpdate) {
      res.status(400);
      throw new Error(`Library does not exist for user.`);
    }

    const newLibrary = await Library.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: { games: newGame },
      },
      { new: true }
    );

    res.json(newLibrary);
  } catch (error) {
    return next(error);
  }
};

const markLibraryInactive = async (req, res) => {
  try {
    const foundLibrary = await Library.findOne({ user: req.user.id });

    if (!foundLibrary) {
      res.status(400);
      throw new Error(`Library does not exist for user.`);
    }

    const inactiveLibrary = await Library.findOneAndUpdate(
      {
        user: req.user.id,
      },
      { active: false }
    );

    res.json(inactiveLibrary);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createNewLibrary,
  getAllUserLibraries,
  addGameToLibrary,
  getUserLibrary,
  markLibraryInactive,
};
