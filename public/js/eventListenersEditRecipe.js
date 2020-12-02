let recipeType = document.getElementById("recipeType");

let servings = document.getElementById("servings");

let seasoning = document.getElementById("seasoning");
let seasoningArr = seasoning.value.split(",");

let tags = document.getElementById("tags");
let tagsArr = tags.value.split(",");

document.addEventListener("DOMContentLoaded", function () {
  /*Recipe Type Select field Manipulation */
  var recipeTypeElem = document.querySelector("#recipeSelectField");
  var instances = M.FormSelect.init(recipeTypeElem);
  document
    .querySelector(`#recipeSelectField option[value=${recipeType.value}]`)
    .setAttribute("selected", "selected");
  M.FormSelect.init(recipeTypeElem);

  /*Recipe Number of Servings Select field Manipulation */
  var numberOfServingsTypeElem = document.querySelector("#numOfServingsField");
  var instances = M.FormSelect.init(numberOfServingsTypeElem);
  document
    .querySelector(`#numOfServingsField option[value='${servings.value}']`)
    .setAttribute("selected", "selected");
  M.FormSelect.init(numberOfServingsTypeElem);

  /*Recipe Seasoning Select field Manipulation */
  var seasoningTypeElem = document.querySelector("#seasoningSelect");
  console.log(seasoningTypeElem);
  for (let i = 0; i < seasoningArr.length; i++) {
    if (seasoningArr[i] !== "") {
      console.log(seasoningArr[i]);
      document
        .querySelector(`#seasoningSelect option[value='${seasoningArr[i]}']`)
        .setAttribute("selected", "selected");
    }
  }
  M.FormSelect.init(seasoningTypeElem);

  /*Tag field Manipulation */

  var tagTypeElem = document.querySelector(".chips-initial");

  var elems = document.querySelectorAll(".chips-initial");

  /* TO BE RESOLVED */
  M.Chips.init(elems, {
    data: [
      {
        tag: "Apple",
      },
      {
        tag: "Microsoft",
      },
      {
        tag: "Google",
      },
    ],
  });

  console.log(tagTypeElem);

  for (let i = 0; i < tagsArr.length; i++) {
    if (tagsArr[i].length > 0) {
      //let tagElem = document.createElement("div");
      //tagElem.classList.add("chips");
      tagElem.style.display = "inline-block";
      tagElem.textContent = tagsArr[i];
      let iconElem = document.createElement("i");
      iconElem.classList.add("material-icons");
      iconElem.classList.add("close");
      iconElem.textContent = "close";
      tagElem.appendChild(iconElem);

      tagContainer.appendChild(tagElem);
    }
  }
});
