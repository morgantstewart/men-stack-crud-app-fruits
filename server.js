//server.js

const dotenv = require("dotenv"); // require package

dotenv.config(); // Loads the environment variables from .env file

const mongoose = require("mongoose"); // require package
const express = require('express');
const app = express();

// Import the Fruit model
const Fruit = require("./models/fruit.js");


mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});




// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});


// server.js

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

