const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Library = require("../models/Library");

/**
 * Registers a user using username, password, and name.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const registerUser = async (req, res, next) => {
  try {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields." });
    }

    // Check if user exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const user = await User.create({
      name,
      username,
      password: hashedPassword,
    });

    // Create a library for the user
    const newLibrary = new Library({
      user: user.id,
      games: [],
    });

    await Library.create(newLibrary);

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        username: user.username,
        token: generateJWT(user._id),
        createdAt: user.createdAt,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Login a user and return their token for accessing protected routes.
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Check for username
    const user = await User.findOne({ username });

    // If user exists and passwords match
    if (
      user &&
      user.active &&
      (await bcrypt.compare(password, user.password))
    ) {
      res.json({
        _id: user.id,
        name: user.name,
        username: user.username,
        token: generateJWT(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get information for a logged in user.
 * @param {*} req
 * @param {*} res
 */
const getMe = async (req, res) => {
  const { _id, name, username } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name,
    username,
  });
};

/**
 * Generates a signed JWT to be used for protected routes.
 * @param {*} id
 * @returns
 */
const generateJWT = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
