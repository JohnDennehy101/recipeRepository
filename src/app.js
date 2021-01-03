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

/*hbs.registerHelper("formatTags", function (tags) {
  let tagsArr = tags.split(",");
  for (let i = 0; i < tagsArr.length; i++) {
    let tagBtn = document.createElement("a");
    tagBtn.classList.add("waves-effect");
    tagBtn.classList.add("waves-light btn");
    tagBtn.style["margin"] = "margin: 0px 7px";
    tagBtn.textContent = tagsArr[i];
  }
});*/

mongoose.connect("mongodb://127.0.0.1:27017/recipes_collection", {
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
      //res.status(200).json(result);
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
      //res.status(200).json(result);

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

  /*function axiosObtainRecipeApiData() {
    const promise = axios.get(apiUrl);
    const dataPromise = promise.then((response) => {
      return response.data;
    });
    return dataPromise;
  }

  let test = axiosObtainRecipeApiData();

  let finalTest = test.then((data) => {
    console.log(data);
  }); */

  let testResponse = {
    meals: [
      {
        idMeal: "52940",
        strMeal: "Brown Stew Chicken",
        strDrinkAlternate: null,
        strCategory: "Chicken",
        strArea: "Jamaican",
        strInstructions:
          "Squeeze lime over chicken and rub well. Drain off excess lime juice.\r\n" +
          "Combine tomato, scallion, onion, garlic, pepper, thyme, pimento and soy sauce in a large bowl with the chicken pieces. Cover and marinate at least one hour.\r\n" +
          "Heat oil in a dutch pot or large saucepan. Shake off the seasonings as you remove each piece of chicken from the marinade. Reserve the marinade for sauce.\r\n" +
          "Lightly brown the chicken a few pieces at a time in very hot oil. Place browned chicken pieces on a plate to rest while you brown the remaining pieces.\r\n" +
          "Drain off excess oil and return the chicken to the pan. Pour the marinade over the chicken and add the carrots. Stir and cook over medium heat for 10 minutes.\r\n" +
          "Mix flour and coconut milk and add to stew, stirring constantly. Turn heat down to minimum and cook another 20 minutes or until tender.",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg",
        strTags: "Stew",
        strYoutube: "https://www.youtube.com/watch?v=_gFB1fkNhXs",
        strIngredient1: "Chicken",
        strIngredient2: "Tomato",
        strIngredient3: "Onions",
        strIngredient4: "Garlic Clove",
        strIngredient5: "Red Pepper",
        strIngredient6: "Carrots",
        strIngredient7: "Lime",
        strIngredient8: "Thyme",
        strIngredient9: "Allspice",
        strIngredient10: "Soy Sauce",
        strIngredient11: "Cornstarch",
        strIngredient12: "Coconut Milk",
        strIngredient13: "Vegetable Oil",
        strIngredient14: "",
        strIngredient15: "",
        strIngredient16: "",
        strIngredient17: "",
        strIngredient18: "",
        strIngredient19: "",
        strIngredient20: "",
        strMeasure1: "1 whole",
        strMeasure2: "1 chopped",
        strMeasure3: "2 chopped",
        strMeasure4: "2 chopped",
        strMeasure5: "1 chopped",
        strMeasure6: "1 chopped",
        strMeasure7: "1",
        strMeasure8: "2 tsp",
        strMeasure9: "1 tsp ",
        strMeasure10: "2 tbs",
        strMeasure11: "2 tsp",
        strMeasure12: "2 cups ",
        strMeasure13: "1 tbs",
        strMeasure14: "",
        strMeasure15: "",
        strMeasure16: "",
        strMeasure17: "",
        strMeasure18: "",
        strMeasure19: "",
        strMeasure20: "",
        strSource:
          "http://www.geniuskitchen.com/recipe/authentic-jamaican-brown-stew-chicken-347996",
        dateModified: null,
      },
    ],
  };

  let recipeSeasoning = utils.obtainRecipeSeasoning(testResponse);

  let recipeIngredients = utils.obtainIngredientsString(testResponse);

  let recipe = {
    id: testResponse.meals[0].idMeal,
    imagePath: testResponse.meals[0].strMealThumb,
    title: testResponse.meals[0].strMeal,
    type: "",
    description: "",
    numberOfServings: 3,
    tags: testResponse.meals[0].strArea,
    seasoning: recipeSeasoning,
    ingredients: recipeIngredients,
    method: testResponse.meals[0].strInstructions,
    link: testResponse.meals[0].strSource,
  };

  res.render("viewRecipe", {
    recipe,
  });

  app.get("/saveRecipe/:id", (req, res) => {
    let recipeId = req.params.id;

    let apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

    /*function axiosObtainRecipeApiData() {
    const promise = axios.get(apiUrl);
    const dataPromise = promise.then((response) => {
      return response.data;
    });
    return dataPromise;
  }

  let test = axiosObtainRecipeApiData();

  let finalTest = test.then((data) => {
    console.log(data);
  }); */

    let testResponse = {
      meals: [
        {
          idMeal: "52940",
          strMeal: "Brown Stew Chicken",
          strDrinkAlternate: null,
          strCategory: "Chicken",
          strArea: "Jamaican",
          strInstructions:
            "Squeeze lime over chicken and rub well. Drain off excess lime juice.\r\n" +
            "Combine tomato, scallion, onion, garlic, pepper, thyme, pimento and soy sauce in a large bowl with the chicken pieces. Cover and marinate at least one hour.\r\n" +
            "Heat oil in a dutch pot or large saucepan. Shake off the seasonings as you remove each piece of chicken from the marinade. Reserve the marinade for sauce.\r\n" +
            "Lightly brown the chicken a few pieces at a time in very hot oil. Place browned chicken pieces on a plate to rest while you brown the remaining pieces.\r\n" +
            "Drain off excess oil and return the chicken to the pan. Pour the marinade over the chicken and add the carrots. Stir and cook over medium heat for 10 minutes.\r\n" +
            "Mix flour and coconut milk and add to stew, stirring constantly. Turn heat down to minimum and cook another 20 minutes or until tender.",
          strMealThumb:
            "https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg",
          strTags: "Stew",
          strYoutube: "https://www.youtube.com/watch?v=_gFB1fkNhXs",
          strIngredient1: "Chicken",
          strIngredient2: "Tomato",
          strIngredient3: "Onions",
          strIngredient4: "Garlic Clove",
          strIngredient5: "Red Pepper",
          strIngredient6: "Carrots",
          strIngredient7: "Lime",
          strIngredient8: "Thyme",
          strIngredient9: "Allspice",
          strIngredient10: "Soy Sauce",
          strIngredient11: "Cornstarch",
          strIngredient12: "Coconut Milk",
          strIngredient13: "Vegetable Oil",
          strIngredient14: "",
          strIngredient15: "",
          strIngredient16: "",
          strIngredient17: "",
          strIngredient18: "",
          strIngredient19: "",
          strIngredient20: "",
          strMeasure1: "1 whole",
          strMeasure2: "1 chopped",
          strMeasure3: "2 chopped",
          strMeasure4: "2 chopped",
          strMeasure5: "1 chopped",
          strMeasure6: "1 chopped",
          strMeasure7: "1",
          strMeasure8: "2 tsp",
          strMeasure9: "1 tsp ",
          strMeasure10: "2 tbs",
          strMeasure11: "2 tsp",
          strMeasure12: "2 cups ",
          strMeasure13: "1 tbs",
          strMeasure14: "",
          strMeasure15: "",
          strMeasure16: "",
          strMeasure17: "",
          strMeasure18: "",
          strMeasure19: "",
          strMeasure20: "",
          strSource:
            "http://www.geniuskitchen.com/recipe/authentic-jamaican-brown-stew-chicken-347996",
          dateModified: null,
        },
      ],
    };

    let recipeSeasoning = utils.obtainRecipeSeasoning(testResponse);

    let recipeIngredients = utils.obtainIngredientsString(testResponse);

    let recipe = new Recipe({
      id: testResponse.meals[0].idMeal,
      title: testResponse.meals[0].strMeal,
      description: "",
      imagePath: testResponse.meals[0].strMealThumb,
      link: testResponse.meals[0].strSource,
      type: "",
      tags: testResponse.meals[0].strArea,
      numberOfServings: 3,
      seasoning: recipeSeasoning,
      ingredients: recipeIngredients,
      method: testResponse.meals[0].strInstructions,
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
      //res.status(200).json(result);
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

  console.log(req.body);

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
      /*type: req.body.recipeType,
        tags: req.body.recipeTags,
        numberOfServings: req.body.numberOfServings,
        seasoning: req.body.recipeSeasoning,
        ingredients: req.body.recipeIngredients,
        method: req.body.recipeMethod,*/
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

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
