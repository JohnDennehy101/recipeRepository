let addIngredientButton = document.getElementById("addIngredientBtn");
let addIngredientInputField = document.getElementById("Ingredient");
let ingredientList = document.getElementById("ingredientList");

let addMethodStepBtn = document.getElementById("addMethodStepBtn");
let addMethodStepField = document.getElementById("Method");
let methodStepList = document.getElementById("MethodStepList");
let count = 1;

let tagContainer = document.getElementById("tagContainer");

let recipeTypeSelectField = document.getElementById("recipeSelectField");

let recipeTypeStore = document.getElementById("recipeTypeStore");

let seasoningStore = document.getElementById("seasoningStore");

let seasoningSelectField = document.getElementById("seasoningSelect");

let tagsStore = document.getElementById("tagsStore");

let chipEls;

let replaceDeletedTag = "";

addIngredientButton.addEventListener("click", (e) => {
  /*let rowDiv = e.path[3];
  let newRowEl = document.createElement("div");
  newRowEl.classList.add("row");
  let inputFieldDivWrapper = document.createElement("div");
  inputFieldDivWrapper.classList.add("input-field");
  inputFieldDivWrapper.classList.add("col");
  inputFieldDivWrapper.classList.add("s12");

  let newIngredientInput = document.createElement("input");
  let newIngredientLabel = document.createElement("label");
  newIngredientLabel.setAttribute("for", `Ingredient${count}`);
  newIngredientLabel.textContent = "Ingredient";
  newIngredientInput.id = `Ingredient${count}`;
  count++;
  newIngredientInput.type = "text";
  newIngredientInput.classList.add("validate");
  inputFieldDivWrapper.appendChild(newIngredientInput);
  inputFieldDivWrapper.appendChild(newIngredientLabel);
  newRowEl.appendChild(inputFieldDivWrapper);

   console.log(addIngredientInputField.value); */

  ingredientList.textContent +=
    "\u2022 " + addIngredientInputField.value + "\n";
  //M.textareaAutoResize("ingredientList");
  addIngredientInputField.value = "";

  //rowDiv.appendChild(newRowEl);
});

addMethodStepBtn.addEventListener("click", () => {
  methodStepList.textContent += count + ". " + addMethodStepField.value + "\n";
  count++;
  addMethodStepField.value = "";
  //M.textareaAutoResize("ingredientList");
  addIngredientInputField.value = "";
});

tagContainer.addEventListener("keyup", (e) => {
  tagsStore.value = "";
  if (e.code === "Enter") {
    let chips = e.path[1].childNodes;
    //console.log(chips);
    for (let i = 1; i < chips.length - 1; i++) {
      let formatText = chips[i].textContent.indexOf("close");
      let finalText = chips[i].textContent.substring(0, formatText);
      tagsStore.value += finalText + ",";
      finalText = "";
      formatText = 0;
    }
    chipEls = document.getElementsByClassName("chip");
    //console.log(chipEls);
    //console.log(chipEls.childNodes);

    if (chipEls !== undefined) {
      for (let i = 0; i < chipEls.length; i++) {
        chipEls[i].children[0].addEventListener("click", (e) => {
          let unformattedDeletion = e.path[1].innerText;
          let formatDeletionText = unformattedDeletion.indexOf("close");
          let finalTagTextDeletion = unformattedDeletion.substring(
            0,
            formatDeletionText
          );
          //console.log(tagsStore.value.indexOf(finalTagTextDeletion[0]));
          let beforeDeletion = tagsStore.value.slice(
            0,
            tagsStore.value.indexOf(finalTagTextDeletion[0])
          );

          console.log(tagsStore.value.indexOf(finalTagTextDeletion));
          //let replace = `${finalTagTextDeletion}`;
          //let replace = ",";
          //let re = new RegExp(replace, "g");
          //let test1000 = `${tagsStore.value}`.replace(re, "");
          //console.log("Test 1000: " + test1000);
          //replaceDeletedTag = tagsStore.value.replace(
          //  `${finalTagTextDeletion}`,
          //  "testings"
          // );
          console.log("before deletion: " + beforeDeletion);
          /*console.log("testing replace: " + replaceDeletedTag);
          
          console.log(finalTagTextDeletion + "To be deleted");
          console.log("first char: " + finalTagTextDeletion.charAt(0)); */
          /*let afterDeletion = tagsStore.value.substring(
            tagsStore.value.indexOf(
              finalTagTextDeletion.charAt(finalTagTextDeletion.length - 1)
            )
          );*/
          console.log(
            "Index position " +
              (tagsStore.value.indexOf(
                beforeDeletion.charAt(beforeDeletion.length - 1)
              ) +
                finalTagTextDeletion.length +
                1)
          );
          console.log(
            "First char to go from: " +
              tagsStore.value.indexOf(
                beforeDeletion.charAt(beforeDeletion.length - 1)
              )
          );
          let afterDeletion = tagsStore.value.slice(
            tagsStore.value.indexOf(
              beforeDeletion.charAt(beforeDeletion.length - 1)
            ) + finalTagTextDeletion.length
          );

          console.log("After deletion " + afterDeletion);
          tagsStore.value = "";
          let test = false;
          while (!test) {
            tagsStore.value = beforeDeletion + afterDeletion;
            beforeDeletion = "";
            afterDeletion = "";
            unformattedDeletion = "";
            console.log("Value after change: " + tagsStore.value);
            test = true;
            break;
          }

          console.log(finalTagTextDeletion);
          console.log(tagsStore.value);
          console.log(beforeDeletion);
          console.log(afterDeletion);
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
