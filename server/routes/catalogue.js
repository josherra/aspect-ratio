const express = require("express");
const { protect } = require("../middleware/authHandler");
const router = express.Router();
const {
  createNewCatalogue,
  getAllCatalogues,
  addGameToCatalogue,
} = require("../controllers/catalogueController");

// Models
const Catalogue = require("../models/Catalogue");

// Routes
router.get("/", protect, getAllCatalogues);
router.post("/", protect, createNewCatalogue);
router.put("/:id", addGameToCatalogue);

module.exports = router;
