let recipeType = document.getElementById("recipeType");

let servings = document.getElementById("servings");

let seasoning = document.getElementById("seasoning");
let seasoningArr = seasoning.value.split(",");

let tags = document.getElementById("tags");
let tagsArr = tags.value.split(",");

/*Events to handle user changes */
let recipeTypeSelectField = document.getElementById("recipeSelectField");

let numOfServingsField = document.getElementById("numOfServingsField");

let seasoningSelectField = document.getElementById("seasoningSelect");

let tagContainer = document.getElementById("tagContainer");

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
  var elems = document.querySelectorAll(".chips");
  let tagsObjectArr = [];
  for (let i = 0; i < tagsArr.length; i++) {
    if (tagsArr[i] !== "") {
      tagsObjectArr.push({ tag: tagsArr[i] });
    }
  }

  M.Chips.init(elems, {
    data: tagsObjectArr,
  });
});

recipeTypeSelectField.addEventListener("change", (e) => {
  recipeType.value = e.target.value;
});

numOfServingsField.addEventListener("change", (e) => {
  servings.value = e.target.value;
});

seasoningSelectField.addEventListener("change", (e) => {
  let options = e.target.selectedOptions;
  seasoning.value = "";

  for (let i = 1; i < options.length; i++) {
    if (!seasoning.value.includes(options[i].textContent)) {
      seasoning.value += options[i].textContent + ",";
    }
  }
});

tagContainer.addEventListener("keyup", (e) => {
  tags.value = "";
  if (e.code === "Enter") {
    let chips = e.path[1].childNodes;
    //console.log(chips);
    for (let i = 1; i < chips.length - 1; i++) {
      let formatText = chips[i].textContent.indexOf("close");
      let finalText = chips[i].textContent.substring(0, formatText);
      tags.value += finalText + ",";
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
          let beforeDeletion = tags.value.slice(
            0,
            tags.value.indexOf(finalTagTextDeletion[0])
          );

          console.log(tags.value.indexOf(finalTagTextDeletion));
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
              (tags.value.indexOf(
                beforeDeletion.charAt(beforeDeletion.length - 1)
              ) +
                finalTagTextDeletion.length +
                1)
          );
          console.log(
            "First char to go from: " +
              tags.value.indexOf(
                beforeDeletion.charAt(beforeDeletion.length - 1)
              )
          );
          let afterDeletion = tags.value.slice(
            tags.value.indexOf(
              beforeDeletion.charAt(beforeDeletion.length - 1)
            ) + finalTagTextDeletion.length
          );

          console.log("After deletion " + afterDeletion);
          tags.value = "";
          let test = false;
          while (!test) {
            tags.value = beforeDeletion + afterDeletion;
            beforeDeletion = "";
            afterDeletion = "";
            unformattedDeletion = "";
            console.log("Value after change: " + tags.value);
            test = true;
            break;
          }

          console.log(finalTagTextDeletion);
          console.log(tags.value);
          console.log(beforeDeletion);
          console.log(afterDeletion);
        });
      }
    }
  }
  console.log(tags.value);
});
