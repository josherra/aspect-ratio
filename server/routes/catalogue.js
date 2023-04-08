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
} = require("../controllers/catalogueController");

// Routes
router.get("/", protect, getAllCatalogues);
router.post("/", protect, createNewCatalogue);
router.put("/:id", addGameToCatalogue);

module.exports = router;
