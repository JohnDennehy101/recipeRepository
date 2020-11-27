let recipeCategorySelectField = document.getElementById(
  "recipeCategorySelectField"
);

let count = 0;

let recipeResults = document.getElementById("recipeResults");

recipeCategorySelectField.addEventListener("change", (e) => {
  async function fetchRecipesJson() {
    let testArr = [
      {
        strMeal: "Brown Stew Chicken",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg",
        idMeal: "52940",
      },
      {
        strMeal: "Chick-Fil-A Sandwich",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/sbx7n71587673021.jpg",
        idMeal: "53016",
      },
      {
        strMeal: "Chicken & mushroom Hotpot",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg",
        idMeal: "52846",
      },
      {
        strMeal: "Chicken Alfredo Primavera",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg",
        idMeal: "52796",
      },
      {
        strMeal: "Chicken Basquaise",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/wruvqv1511880994.jpg",
        idMeal: "52934",
      },
      {
        strMeal: "Chicken Congee",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/1529446352.jpg",
        idMeal: "52956",
      },
      {
        strMeal: "Chicken Couscous",
        strMealThumb:
          "https://www.themealdb.com/images/media/meals/qxytrx1511304021.jpg",
        idMeal: "52850",
      },
    ];
    /*let initialRecipeResponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.value}`
    );

    let jsonRecipeResponse = await initialRecipeResponse.json(); 

    return jsonRecipeResponse;*/
    return testArr;
  }

  fetchRecipesJson().then((recipes) => {
    createRecipeCards(recipes);
    console.log(recipes);
  });
});

function createRecipeCards(recipes) {
  let newRowElem = document.createElement("div");
  newRowElem.classList.add("row");
  let recipeResponseArr = [...recipes];
  for (let i = 0; i < recipeResponseArr.length; i++) {
    let parentDivElem = document.createElement("div");
    parentDivElem.classList.add("col");
    parentDivElem.classList.add("s4");
    parentDivElem.classList.add("m4");

    let cardDivElem = document.createElement("div");
    cardDivElem.classList.add("card");

    let cardImageDivElem = document.createElement("div");
    cardImageDivElem.classList.add("card-image");

    let imageElem = document.createElement("img");
    imageElem.src = recipeResponseArr[i].strMealThumb;

    let linkElem = document.createElement("a");
    linkElem.classList.add(
      "btn-floating",
      "halfway-fab",
      "waves-effect",
      "waves-light",
      "red"
    );
    linkElem.href = `viewapirecipe/${recipeResponseArr[i].idMeal}`;

    let iconElem = document.createElement("i");
    iconElem.classList.add("material-icons");
    iconElem.textContent = "add";

    linkElem.appendChild(iconElem);
    cardImageDivElem.appendChild(imageElem);
    cardImageDivElem.appendChild(linkElem);

    let cardContentElem = document.createElement("div");
    cardContentElem.classList.add("card-content");

    let cardTitleElem = document.createElement("span");
    cardTitleElem.classList.add("card-title");
    cardTitleElem.textContent = recipeResponseArr[i].strMeal;

    cardContentElem.appendChild(cardTitleElem);

    cardDivElem.appendChild(cardImageDivElem);
    cardDivElem.appendChild(cardContentElem);

    parentDivElem.appendChild(cardDivElem);

    newRowElem.appendChild(parentDivElem);

    count++;

    if (count === 2) {
      recipeResults.appendChild(newRowElem);
      count = 0;
    }
  }
}
