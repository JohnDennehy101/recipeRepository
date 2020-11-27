const utils = {
  obtainIngredientsString(apiResponse) {
    let recipeDetail = apiResponse.meals[0];
    let ingredientsStr = "";

    let ingredientCount = 1;

    for (let i = 0; i < 30; i++) {
      if (
        recipeDetail[`strIngredient${ingredientCount}`] !== undefined &&
        recipeDetail[`strIngredient${ingredientCount}`] !== ""
      ) {
        ingredientsStr +=
          recipeDetail[`strMeasure${ingredientCount}`] +
          " " +
          recipeDetail[`strIngredient${ingredientCount}`] +
          "\r\n";
        ingredientCount++;
      } else if (recipeDetail[`strIngredient${ingredientCount}`] === "") {
        ingredientCount++;
      } else if (
        recipeDetail[`strIngredient${ingredientCount}`] === undefined
      ) {
        allIngredientsFound = true;
        return ingredientsStr;
      }
    }
  },

  obtainRecipeSeasoning(apiResponse) {
    let recipeDetail = apiResponse.meals[0];
    let ingredientCount = 1;
    let recipeArr = [];
    let seasoningStr = "";

    for (let i = 0; i < 30; i++) {
      if (
        recipeDetail[`strIngredient${ingredientCount}`] !== undefined &&
        recipeDetail[`strIngredient${ingredientCount}`] !== ""
      ) {
        recipeArr.push(recipeDetail[`strIngredient${ingredientCount}`]);
        ingredientCount++;
      } else if (recipeDetail[`strIngredient${ingredientCount}`] === "") {
        ingredientCount++;
      } else if (
        recipeDetail[`strIngredient${ingredientCount}`] === undefined
      ) {
        allIngredientsFound = true;
        //return recipeArr;
        break;
      }
    }

    for (let j = 0; j < recipeArr.length; j++) {
      if (
        recipeArr[j].toLowerCase() === "basil" ||
        recipeArr[j].toLowerCase() === "bay leaves" ||
        recipeArr[j].toLowerCase() === "black pepper" ||
        recipeArr[j].toLowerCase() === "cardamom pods" ||
        recipeArr[j].toLowerCase() === "cayenne pepper" ||
        recipeArr[j].toLowerCase() === "chilli flakes" ||
        recipeArr[j].toLowerCase() === "cinnamon" ||
        recipeArr[j].toLowerCase() === "coriander" ||
        recipeArr[j].toLowerCase() === "cumin" ||
        recipeArr[j].toLowerCase() === "curry powder" ||
        recipeArr[j].toLowerCase() === "fennel" ||
        recipeArr[j].toLowerCase() === "garam masala" ||
        recipeArr[j].toLowerCase() === "ginger" ||
        recipeArr[j].toLowerCase() === "marjoram" ||
        recipeArr[j].toLowerCase() === "oregano" ||
        recipeArr[j].toLowerCase() === "paprika" ||
        recipeArr[j].toLowerCase() === "parsley" ||
        recipeArr[j].toLowerCase() === "rosemary" ||
        recipeArr[j].toLowerCase() === "tarragon" ||
        recipeArr[j].toLowerCase() === "thyme" ||
        recipeArr[j].toLowerCase() === "turmeric"
      ) {
        seasoningStr += recipeArr[j] + ",";
      }
    }
    return seasoningStr;
  },
};

module.exports = utils;
