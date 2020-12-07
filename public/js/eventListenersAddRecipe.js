let addIngredientButton = document.getElementById("addIngredientBtn");
let addIngredientInputField = document.getElementById("Ingredient");
let ingredientList = document.getElementById("ingredientList");

let addMethodStepBtn = document.getElementById("addMethodStepBtn");
let addMethodStepField = document.getElementById("Method");
let methodStepList = document.getElementById("MethodStepList");
let count = 1;

let tagContainer = document.getElementById("tagContainer");

let recipeTypeSelectField = document.getElementById("recipeSelectField");

let numOfServingsField = document.getElementById("numOfServingsField");

let servingValueStore = document.getElementById("servingValueStore");

let recipeTypeStore = document.getElementById("recipeTypeStore");

let seasoningStore = document.getElementById("seasoningStore");

let seasoningSelectField = document.getElementById("seasoningSelect");

let tagsStore = document.getElementById("tagsStore");

let chipEls;

let replaceDeletedTag = "";

let imageUrl = document.getElementById("imageUrl");

let imagePathCollection = [];

for (let i = 1; i < 16; i++) {
  imagePathCollection.push(`/imgs/img${i}.jpg`);
}

let testingArray = [];

tagContainer.addEventListener("keyup", (e) => {
  tagsStore.value = "";
  if (e.code === "Enter") {
    testingArray = [];
    let chips = e.path[1].childNodes;

    for (let i = 1; i < chips.length - 1; i++) {
      let formatText = chips[i].textContent.indexOf("close");
      let finalText = chips[i].textContent.substring(0, formatText);
      tagsStore.value += finalText + ",";
      testingArray.push(finalText);
      console.log(testingArray);

      finalText = "";
      formatText = 0;
    }
    chipEls = document.getElementsByClassName("chip");
    //console.log(chipEls);
    //console.log(chipEls.childNodes);

    if (chipEls !== undefined) {
      for (let i = 0; i < chipEls.length; i++) {
        console.log(chipEls[i].children[0]);
        chipEls[i].children[0].addEventListener("click", (e) => {
          elems = document.querySelectorAll(".chips");
          console.log(elems[0].children[i].innerText);
          let deletedTagUnformattedText = elems[0].children[i].innerText;
          let deletedTagFormattedText = deletedTagUnformattedText.indexOf(
            "close"
          );
          let finalTextElementToBeRemoved = deletedTagUnformattedText.substring(
            0,
            deletedTagFormattedText - 1
          );
          console.log(finalTextElementToBeRemoved.length);
          console.log(tagsStore.value);
          let beforeLength = testingArray.length;
          //console.log(tagsStore.value.indexOf(finalTextElementToBeRemoved))
          console.log(testingArray.indexOf(`${finalTextElementToBeRemoved}`));

          let arrayIndex = testingArray.indexOf(
            `${finalTextElementToBeRemoved}`
          );
          if (arrayIndex > -1) {
            tagsStore.value = "";
            testingArray.splice(arrayIndex, 1);
            tagsStore.value += testingArray.join(",");
            console.log(tagsStore.value);
          }

          console.log(testingArray);

          let unformattedDeletion = e.path[1].innerText;
          let formatDeletionText = unformattedDeletion.indexOf("close");
          let finalTagTextDeletion = unformattedDeletion.substring(
            0,
            formatDeletionText
          );
        });
      }
    }
  }
  console.log(tagsStore.value);
});

recipeTypeSelectField.addEventListener("change", (e) => {
  let options = ["", "Breakfast", "Lunch", "Dinner", "Appetiser", "Snack"];
  recipeTypeStore.value = options[e.target.value];
  //recipeTypeSelectField.textContent = options[e.target.value];
});

numOfServingsField.addEventListener("change", (e) => {
  console.log(e.target.value);
  servingValueStore.value = e.target.value;
});

seasoningSelectField.addEventListener("change", (e) => {
  let options = e.target.selectedOptions;
  seasoningStore.value = "";

  console.log(options);
  for (let i = 1; i < options.length; i++) {
    if (!seasoningStore.value.includes(options[i].textContent)) {
      seasoningStore.value += options[i].textContent + ",";
    }
  }
});

function obtainRandomImagePath() {
  let imagePaths = [...imagePathCollection];
  let randomIndexPosition = Math.floor(Math.random() * imagePaths.length);
  return imagePaths[randomIndexPosition];
}

// this way it works
document.addEventListener("DOMContentLoaded", function () {
  imageUrl.value = obtainRandomImagePath();

  var elems = document.querySelectorAll(".sidenav");
  let options = [];
  var instances = M.Sidenav.init(elems, options);
});
