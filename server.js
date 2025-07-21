//server.js

const dotenv = require("dotenv"); // require package

dotenv.config(); // Loads the environment variables from .env file

const mongoose = require("mongoose"); // require package
const express = require('express');
const app = express();
const methodOverride = require("method-override"); // new
const morgan = require("morgan"); //new


// Import the Fruit model
const Fruit = require("./models/fruit.js");


mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method")); 
app.use(morgan("dev"));


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
  res.render('fruits/show.ejs', {fruit: foundFruit });
});


app.delete("/fruits/:fruitId", (req, res) => {
  res.send("This is the delete route");
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



//DELETE route
app.delete("/fruits/:fruitId", async (req, res) => {
  await Fruit.findByIdAndDelete(req.params.fruitId);
res.redirect('/fruits');
});





app.listen(3000, () => {
  console.log('Listening on port 3000');
});
