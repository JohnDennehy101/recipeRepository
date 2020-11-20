const path = require("path");
const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const validator = require("validator");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(express.urlencoded());
hbs.registerPartials(partialsPath);

mongoose.connect("mongodb://127.0.0.1:27017/recipes_collection", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Recipe = mongoose.model("Recipe", {
  title: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  link: { type: String, trim: true },
  type: { type: String },
  tags: { type: String },
  seasoning: { type: String },
  ingredients: { type: String },
  method: { type: String },
});

app.get("", (req, res) => {
  let allRecipes = Recipe.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
  /*res.render("index", {
    imagePath: "/imgs/pexels-karolina-grabowska-4199098.jpg",
    allRecipes,
  }); */
});

app.get("/addRecipe", (req, res) => {
  res.render("addRecipe");
});

app.post("/addNewRecipe", (req, res) => {
  let recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    link: req.body.recipeLink,
    type: req.body.recipeType,
    tags: req.body.recipeTags,
    seasoning: req.body.recipeSeasoning,
    ingredients: req.body.recipeIngredients,
    method: req.body.recipeMethod,
  });

  recipe
    .save()
    .then(() => {
      console.log(recipe);
    })
    .catch((error) => {
      console.log(error);
    });
  console.log(req.body);
  console.log(req.body.recipeSeasoning);
  console.log(req.body.recipeType);
  console.log(req.body.title);
  console.log(req.body.description);
  console.log(req.body.recipeLink);
  console.log(req.body.recipeTags);
  console.log(req.body.recipeIngredients);
  console.log(req.body.recipeMethod);

  res.redirect("/");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
