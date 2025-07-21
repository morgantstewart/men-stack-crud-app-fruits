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



// GET /fruits

app.get("/fruits", async (req, res) => {
  const allFruits = await Fruit.find();
  console.log(allFruits); // log the fruits!
  res.render("fruits/index.ejs", {fruits: allFruits});
});


//GET fruits/new
app.get("/fruits/new", (req, res) => {
  res.render("fruits/new.ejs");
});



app.get("/fruits/:fruitId", async (req, res) => {
  const foundFruit = await Fruit.findById(req.params.fruitId);
  res.render(`This route renders the show page for fruit id: ${req.params.fruitId}!`)

  res.render('frtuits/show.ejs', {fruit: foundFruit });
});



//POST /fruits
app.post("/fruits", async (req, res) => {
  if (req.body.isReadyToEat === "on") {
    req.body.isReadyToEat = true;
  } else {
    req.body.isReadyToEat = false;
  }
  await Fruit.create(req.body);
  res.redirect("/fruits/new");
});




app.listen(3000, () => {
  console.log('Listening on port 3000');
});
