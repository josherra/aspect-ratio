const express = require("express");
const cors = require("cors");
const checkAccessToken = require("./middleware/accessToken");

// Route handlers
const search = require("./routes/search");
const games = require("./routes/games");
const platforms = require("./routes/platforms");

// Import env variables
require("dotenv").config();

// Setup express application
const app = express();
const port = 8000;

// Middlware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/search", checkAccessToken, search);
app.use("/api/games", checkAccessToken, games);
app.use("/api/platforms", checkAccessToken, platforms);

// Listening for calls
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
