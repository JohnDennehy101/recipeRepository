const path = require("path");
const express = require("express");
const hbs = require("hbs");
const mongoose = require("mongoose");
const validator = require("validator");
const axios = require("axios");
const utils = require("./utils");

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

//For localhost
/*mongoose.connect("mongodb://127.0.0.1:27017/recipes_collection", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});*/

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Recipe = mongoose.model("Recipe", {
  title: {
    type: String,
    trim: true,
    text: true
  },
  description: {
    type: String,
    trim: true,
  },
  imagePath: {
    type: String,
  },
  link: { type: String, trim: true },
  type: { type: String },
  tags: { type: String },
  numberOfServings: {
    type: Number,
  },
  seasoning: { type: String },
  ingredients: { type: String },
  method: { type: String },
},
);

Recipe.createIndexes({
  title: "text"
})



app.get("/", (req, res) => {
  Recipe.find()
    .then((recipes) => {
      
      res.render("index", {
        recipes,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

app.get("/addRecipe", (req, res) => {
  res.render("addRecipe");
});

app.get("/viewRecipe/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      

      res.render("viewRecipe", {
        recipe,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

app.get("/viewapirecipe/:id", (req, res) => {
  let recipeId = req.params.id;

  let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

  function axiosObtainRecipeApiData() {
    const promise = axios.get(apiUrl);
    const dataPromise = promise.then((response) => {
      return response.data;
    });
    return dataPromise;
  }

  let recipeDataPromise = axiosObtainRecipeApiData();

  console.log(recipeDataPromise)

  let recipeData = recipeDataPromise.then((data) => {
      let recipeSeasoning = utils.obtainRecipeSeasoning(data);

  let recipeIngredients = utils.obtainIngredientsString(data);

  let recipe = {
    id: data.meals[0].idMeal,
    imagePath: data.meals[0].strMealThumb,
    title: data.meals[0].strMeal,
    type: "",
    description: "",
    numberOfServings: 3,
    tags: data.meals[0].strArea,
    seasoning: recipeSeasoning,
    ingredients: recipeIngredients,
    method: data.meals[0].strInstructions,
    link: data.meals[0].strSource,
  };

  res.render("viewRecipe", {
    recipe,
  })
  });

  console.log(recipeData)

  



  app.get("/saveRecipe/:id", (req, res) => {
    let recipeId = req.params.id;

    let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

    function axiosObtainRecipeApiData() {
    const promise = axios.get(apiUrl);
    const dataPromise = promise.then((response) => {
      return response.data;
    });
    return dataPromise;
  }

  let firstApiCallData = axiosObtainRecipeApiData();

  let finalApiManipulation = firstApiCallData.then((data) => {
      let recipeSeasoning = utils.obtainRecipeSeasoning(data);

    let recipeIngredients = utils.obtainIngredientsString(data);

    let recipe = new Recipe({
      id: data.meals[0].idMeal,
      title: data.meals[0].strMeal,
      description: "",
      imagePath: data.meals[0].strMealThumb,
      link: data.meals[0].strSource,
      type: "",
      tags: data.meals[0].strArea,
      numberOfServings: 3,
      seasoning: recipeSeasoning,
      ingredients: recipeIngredients,
      method: data.meals[0].strInstructions,
    });

    recipe
      .save()
      .then(() => {
        console.log(recipe);
        res.redirect("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }); 

   

  });
});

app.get("/deleteRecipe/:id", (req, res) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

app.get("/searchForNewRecipes", (req, res) => {
  res.render("searchForNewRecipesPage");
});

app.get("/additionalFoodResources", (req, res) => {
  res.render("additionalFoodResources");
});

app.get("/searchRecipes", (req, res) => {
let titleSearch = req.query.search
Recipe.find({
  $text: {
    $search: titleSearch
  }
}).then((recipes) => {
  if (recipes.length > 0) {
    res.render("index", {
        recipes,
      });
  }
  else {
    let noSearchResults = true;
    Recipe.find()
    .then((recipes) => {
      res.render("index", {
        recipes,
        noSearchResults
      });
    })
  }
  
}).catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
})

app.get("/editRecipe/:id", (req, res) => {
  let recipeId = req.params.id;

  Recipe.findById(recipeId)
    .then((recipe) => {
      res.render("editRecipe", {
        recipe,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});

app.post("/updateRecipe/:id", (req, res) => {
  let recipeId = req.params.id;
  console.log(req.body);
  Recipe.findByIdAndUpdate(
    { _id: recipeId },
    {
      title: req.body.title,
      description: req.body.description,
      imagePath: req.body.imagePath,
      link: req.body.recipeLink,
      type: req.body.recipeType,
      tags: req.body.recipeTags,
      numberOfServings: req.body.numberOfServings,
      seasoning: req.body.recipeSeasoning,
      ingredients: req.body.recipeIngredients,
      method: req.body.recipeMethod
    },
    { new: true, useFindAndModify: false },
    function (error, recipes) {
      if (error) {
        res.status(400).json({
          error: error,
        });
      } else {
      }
    }
  );

  res.redirect("/");
});

app.post("/addNewRecipe", (req, res) => {
  let recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    imagePath: req.body.imagePath,
    link: req.body.recipeLink,
    type: req.body.recipeType,
    tags: req.body.recipeTags,
    numberOfServings: req.body.numberOfServings,
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

app.listen(process.env.port || 3000, () => {
  console.log("Server is up on port 3000");
});
