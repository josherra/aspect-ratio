// Routing
const express = require("express");
const router = express.Router();

// Auth middleware
const { protect } = require("../middleware/authHandler");

// Controllers
const {
  createNewCatalogue,
  getAllCatalogues,
  addGameToCatalogue,
  getOneCatalogue,
} = require("../controllers/catalogueController");

// Routes
router.get("/", protect, getAllCatalogues);
router.get("/userCatalogue", protect, getOneCatalogue);
router.post("/add", protect, addGameToCatalogue);

module.exports = router;
