const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");
const checkAccessToken = require("./middleware/accessToken");
const mongoose = require("mongoose");

// Route handlers
const search = require("./routes/search");
const games = require("./routes/games");
const platforms = require("./routes/platforms");
const catalogue = require("./routes/catalogue");
const auth = require("./routes/auth");

// Import env variables
require("dotenv").config();

// Setup express application and MongoDB connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL);
mongoose.connection.on("error", (err) => {
  console.error(err);
});

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
app.use("/api/catalogue", catalogue);
app.use("/api/auth", auth);

app.use(errorHandler);
// Listening for calls
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
