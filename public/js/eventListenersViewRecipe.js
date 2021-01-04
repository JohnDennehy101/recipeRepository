let recipeTagString = document.getElementById("recipeTagString");
let tagContainer = document.getElementById("tagContainer");

let seasoningCollection = document.getElementById("seasoningCollection");
let seasoningString = document.getElementById("seasoningString");

let ingredientsField = document.getElementById("ingredientsField");
let recipeIngredientsString = document.getElementById(
  "recipeIngredientsString"
);

let methodField = document.getElementById("methodField");
let recipeMethodString = document.getElementById("recipeMethodString");

document.addEventListener("DOMContentLoaded", function () {
  let tagsArr = recipeTagString.textContent.split(",");
  let seasoningArr = seasoningString.textContent.split(",");

  let ingredientArr = recipeIngredientsString.textContent.split("\r");
  let strWithReturnRemoved = ingredientArr.join("");
  const regex = /\n/gi;
  let formattedStr = strWithReturnRemoved.replace(regex, ",");
  let formattedArr = formattedStr.split(",");

  let methodArr = recipeMethodString.textContent.split("\r");
  console.log(methodArr);
  let methodStrWithReturnRemoved = methodArr.join("");

  let formattedMethodStr = methodStrWithReturnRemoved.replace(regex, "|");
  let formattedMethodArr = formattedMethodStr.split("|");

  for (let g = 0; g < formattedMethodArr.length; g++) {
    console.log(formattedMethodArr[0])
    console.log(formattedMethodArr[g])
    if (formattedMethodArr[g] !== "") {
      let liMethodElem = document.createElement("li");
    liMethodElem.textContent = formattedMethodArr[g];

    liMethodElem.style.listStylePosition = "outside";
    liMethodElem.style.lineHeight = "30px";
    liMethodElem.style.paddingLeft = "7px";
    methodField.style.paddingLeft = "18px";
    methodField.appendChild(liMethodElem);
    }
    
  }

  for (let h = 0; h < formattedArr.length; h++) {
    if (formattedArr[h] !== "") {
      let liElem = document.createElement("li");
      liElem.textContent = formattedArr[h];
      liElem.style.listStyleType = "circle";
      liElem.style.listStylePosition = "inside";
      ingredientsField.appendChild(liElem);
    }
   
  }

  for (let i = 0; i < tagsArr.length; i++) {
    if (tagsArr[i].length > 0) {
      let tagBtn = document.createElement("a");
      tagBtn.classList.add("waves-effect");
      tagBtn.classList.add("waves-light");
      tagBtn.classList.add("btn");
      tagBtn.style.marginRight = "7px";
      tagBtn.style.marginLeft = "7px";
      tagBtn.textContent = tagsArr[i];
      tagContainer.appendChild(tagBtn);
    }
  }

  for (let j = 0; j < seasoningArr.length; j++) {
    if (seasoningArr[j].length > 0) {
      let listElem = document.createElement("li");
      listElem.classList.add("collection-item");
      listElem.classList.add("collection-avatar");
      listElem.style.minHeight = "60px";
      listElem.style.display = "flex";
      listElem.style.alignItems = "center";

      let iconElem = document.createElement("i");
      iconElem.classList.add("material-icons");
      iconElem.classList.add("circle");
      iconElem.classList.add("teal");
      iconElem.classList.add("lighten-2");
      iconElem.style.verticalAlign = "bottom";
      iconElem.style.fontSize = "30px";
      iconElem.style.color = "#FFFFFF";

      iconElem.textContent = "keyboard_arrow_right";

      let spanElem = document.createElement("span");
      spanElem.classList.add("title");
      spanElem.classList.add("left-align");
      spanElem.style.fontSize = "20px";
      spanElem.style.marginLeft = "15px";
      spanElem.textContent = seasoningArr[j];

      listElem.appendChild(iconElem);
      listElem.appendChild(spanElem);

      seasoningCollection.appendChild(listElem);
    }
  }
  console.log(tagsArr);
  console.log(recipeTagString.textContent);

  var elems = document.querySelectorAll('.sidenav');
    let options = [];
    var instances = M.Sidenav.init(elems, options);
});
