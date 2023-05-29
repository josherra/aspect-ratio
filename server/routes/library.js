// Routing
const express = require("express");
const router = express.Router();

// Auth middleware
const { protect } = require("../middleware/authHandler");

// Controllers
const {
  addGameToLibrary,
  getAllUserLibraries,
  getUserLibrary,
} = require("../controllers/libraryController");

// Routes
router.get("/", protect, getAllUserLibraries);
router.get("/userLibrary", protect, getUserLibrary);
router.post("/add", protect, addGameToLibrary);

module.exports = router;
