const path = require("path");
const express = require("express");
const hbs = require("hbs");

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

app.get("", (req, res) => {
  res.render("index", {
    imagePath: "/imgs/pexels-karolina-grabowska-4199098.jpg",
  });
});

app.get("/addRecipe", (req, res) => {
  res.render("addRecipe");
});

app.post("/addNewRecipe", (req, res) => {
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
