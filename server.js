//server.js

const dotenv = require("dotenv"); // require package

dotenv.config(); // Loads the environment variables from .env file

const mongoose = require("mongoose"); // require package
const express = require('express');
const app = express();

// Import the Fruit model
const Fruit = require("./models/fruit.js");



mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
//middleware in front of routes


// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});


//GET fruits/new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});


//POST /fruits
app.post('/fruits', async (req,res) => {
  if (req.body.isReadyToEat === 'on') {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  

  await Fruit.create.apply(req.body);
  res.redirect('/fruits/new');
});


app.listen(3000, () => {
  console.log('Listening on port 3000');
});