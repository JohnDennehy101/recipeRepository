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

let testingArray = [];

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

  var elems = document.querySelectorAll(".sidenav");
  let options = [];
  var instances = M.Sidenav.init(elems, options);

  /*Added for testing */
  for (let i = 0; i < tagContainer.children.length - 1; i++) {
    let tagUnformattedText = tagContainer.children[i].textContent;
    let tagFormattedText = tagUnformattedText.indexOf("close");
    let tagElementText = tagUnformattedText.substring(0, tagFormattedText);
    testingArray.push(tagElementText);
  }

  console.log(testingArray);

  chipEls = document.getElementsByClassName("chip");
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
        let indexPosition = testingArray.indexOf(finalTextElementToBeRemoved);
        testingArray.splice(indexPosition, 1);
        tags.value += testingArray.join(",");
        console.log(testingArray);
      });
    }
  }
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
  //tagsStore.value = "";
  if (e.code === "Enter") {
    testingArray = [];
    let chips = e.path[1].childNodes;

    for (let i = 1; i < chips.length - 1; i++) {
      console.log(chips[i].textContent);
      let formatText = chips[i].textContent.indexOf("close");
      let finalText = chips[i].textContent.substring(0, formatText);
      tags.value += finalText + ",";
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
          console.log(tags.value);
          let beforeLength = testingArray.length;
          //console.log(tagsStore.value.indexOf(finalTextElementToBeRemoved))
          console.log(testingArray.indexOf(`${finalTextElementToBeRemoved}`));

          let arrayIndex = testingArray.indexOf(
            `${finalTextElementToBeRemoved}`
          );
          if (arrayIndex > -1) {
            tags.value = "";
            testingArray.splice(arrayIndex, 1);
            tags.value += testingArray.join(",");
            console.log(tags.value);
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
  console.log(tags.value);
});

// tagContainer.addEventListener("click", (e) => {
//   testingArray = [];
//   let chips = e.path[1].childNodes;
//   console.log(e.path[1].M_Chips.chipsData);

//   for (let i = 1; i < chips.length - 1; i++) {
//     let formatText = chips[i].textContent.indexOf("close");
//     let finalText = chips[i].textContent.substring(0, formatText);
//     tags.value += finalText + ",";
//     testingArray.push(finalText);
//     console.log(testingArray);

//     finalText = "";
//     formatText = 0;
//   }

//   console.log(testingArray);

//   let deletedTagUnformattedText = e.path[1].innerText;
//   let deletedTagFormattedText = deletedTagUnformattedText.indexOf("close");
//   let finalTextElementToBeRemoved = deletedTagUnformattedText.substring(
//     0,
//     deletedTagFormattedText - 1
//   );
// });

// chipEls = document.getElementsByClassName("chip");

// if (chipEls !== undefined) {
//   for (let i = 0; i < chipEls.length; i++) {
//     console.log(chipEls[i].children[0]);
//     chipEls[i].children[0].addEventListener("click", (e) => {
//       elems = document.querySelectorAll(".chips");
//       console.log(elems[0].children[i].innerText);
//       let deletedTagUnformattedText = elems[0].children[i].innerText;
//       let deletedTagFormattedText = deletedTagUnformattedText.indexOf("close");
//       let finalTextElementToBeRemoved = deletedTagUnformattedText.substring(
//         0,
//         deletedTagFormattedText - 1
//       );
//       console.log(finalTextElementToBeRemoved.length);
//       console.log(tagsStore.value);
//       let beforeLength = testingArray.length;
//       //console.log(tagsStore.value.indexOf(finalTextElementToBeRemoved))
//       console.log(testingArray.indexOf(`${finalTextElementToBeRemoved}`));

//       let arrayIndex = testingArray.indexOf(`${finalTextElementToBeRemoved}`);
//       if (arrayIndex > -1) {
//         tags.value = "";
//         testingArray.splice(arrayIndex, 1);
//         tags.value += testingArray.join(",");
//         console.log(tags.value);
//       }

//       console.log(testingArray);

//       let unformattedDeletion = e.path[1].innerText;
//       let formatDeletionText = unformattedDeletion.indexOf("close");
//       let finalTagTextDeletion = unformattedDeletion.substring(
//         0,
//         formatDeletionText
//       );
//     });
//   }
// }
