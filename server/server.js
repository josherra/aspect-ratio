const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;

// Middlware
app.use(cors());

app.get("/", (req, res) => {
  res.json({ value: "Hello" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
