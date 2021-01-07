let recipeCategorySelectField = document.getElementById(
  "recipeCategorySelectField"
);


let apiResponseRecipes = [];

let recipeResults = document.getElementById("recipeResults");

let input = document.querySelector('.input-field')


 document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('select');
            let options = []
            var instances = M.FormSelect.init(elems, options);
        });

recipeCategorySelectField.addEventListener("change", (e) => {
  async function fetchRecipesJson() {
   
    let initialRecipeResponse = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.value}`
    );

    let jsonRecipeResponse = await initialRecipeResponse.json(); 
    return jsonRecipeResponse;
  }

  fetchRecipesJson().then((recipes) => {
     console.log(recipes);
     apiResponseRecipes = []
     apiResponseRecipes = recipes.meals
     console.log(apiResponseRecipes)
     processArray(apiResponseRecipes)
    
    
   
  });
});

async function createRecipeContainerElem(item) {

    let parentDivElem = document.createElement("div");
    parentDivElem.classList.add("col");
    parentDivElem.classList.add("s4");
    parentDivElem.classList.add("m4");
    parentDivElem.classList.add("recipeElement")

    let cardDivElem = document.createElement("div");
    cardDivElem.classList.add("card");

    let cardImageDivElem = document.createElement("div");
    cardImageDivElem.classList.add("card-image");

    let imageElem = document.createElement("img");
    imageElem.src = item.strMealThumb;
   

    let linkElem = document.createElement("a");
    linkElem.classList.add(
      "btn-floating",
      "halfway-fab",
      "waves-effect",
      "waves-light",
      "red"
    );
    linkElem.href = `viewapirecipe/${item.idMeal}`;

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
    cardTitleElem.textContent = item.strMeal;

    cardContentElem.appendChild(cardTitleElem);

    cardDivElem.appendChild(cardImageDivElem);
    cardDivElem.appendChild(cardContentElem);

    parentDivElem.appendChild(cardDivElem);

    
    recipeResults.appendChild(parentDivElem)
  
}

async function processArray(array) {
  while (recipeResults.firstChild) {
    recipeResults.removeChild(recipeResults.firstChild)
  }
  for (const item of array) {
    await createRecipeContainerElem(item);
  }
  console.log('Done!');
}











function createRecipeCards(recipes) {
  let newRowElem = document.createElement("div");
  newRowElem.classList.add("row");
  let recipeResponseArr = [recipes.meals];
  console.log(recipeResponseArr)
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
    //console.log(recipeResponseArr[i])
    console.log(recipeResponseArr[i].strMeal)
    console.log(recipeResponseArr[i].idMeal)
    console.log(recipeResponseArr[i].strMealThumb)
    //console.log(recipeResponseArr[i]["strMealThumb"])
    //imageElem.src = recipeResponseArr[i].strMealThumb;
    imageElem.src = '#'

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


document.addEventListener("DOMContentLoaded", function () {
var elems = document.querySelectorAll('.sidenav');
    let options = [];
    var instances = M.Sidenav.init(elems, options);

console.log(input)
input.style.setProperty('margin-bottom', "630px", 'important');

})

input.addEventListener('change', (e) => {
   input.style.setProperty('margin-bottom', "20px", 'important');
} )


