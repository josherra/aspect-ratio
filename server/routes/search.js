const express = require("express");
const { searchForGames } = require("../controllers/searchController");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("General search endpoint");
});

router.get("/games", searchForGames);

module.exports = router;
