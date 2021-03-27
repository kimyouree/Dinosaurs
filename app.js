import ALL_DINOSAURS from "./dino.js";
import Dinosaur from "./classes/Dinosaur.js";

/**
 * @description formats dino data relative to human data
 * @param {array} dinosData of dino objects
 * @param {object} humanData form input values from user
 * @returns {array} of dinos with formatted properties
 */
// Create Dino Objects
function getDinosaurs(dinosData, humanData) {
  let dinosaurs = dinosData["Dinos"].map(
    (dinoData) => new Dinosaur(dinoData, humanData)
  );
  return dinosaurs;
}

/**
 * @description Collects all the form input values from the DOM
 * @returns {object} containing the (human) form input values
 */
// Create Human Object
function getHumanData() {
  const [name, feet, inches, weight] = document.querySelectorAll("input");
  const diet = document.querySelector("select");

  return {
    name: name.value,
    feet: Number(feet.value),
    inches: Number(inches.value),
    weight: Number(weight.value),
    diet: diet.value,
  };
}

/**
 * @description clears the form from the DOM
 */
function hideForm() {
  const form = document.querySelector("#dino-compare");
  form.style.display = "none";
}

/**
 * @description Chooses a random fact for a specific tile
 * @param {object} tileData dino or human or pigeon object
 * @returns {string} a formatted fact string
 */
function getRandomFact(tileData) {
  if (tileData.species === "human") return;
  if (tileData.species === "Pigeon") return tileData.fact;

  const randomIndex = Math.floor(Math.random() * Math.floor(6));

  switch (randomIndex) {
    case 0:
      return tileData.dietDescription;
    case 1:
      return tileData.fact;
    case 2:
      return `The ${tileData.species} was ${tileData.heightRatio} ${
        tileData.heightRatio > 1 ? "taller" : "shorter"
      } than you.`;
    case 3:
      return `The ${tileData.species} was ${tileData.weightRatio} times ${
        tileData.weightRatio > 1 ? "taller" : "shorter"
      } than you.`;
    case 4:
      return `The ${tileData.species} existed during the ${tileData.when} period.`;
    default:
      return `The ${tileData.species} lived in ${tileData.where}.`;
  }
}

/**
 * @description Generate grid tiles & append them to DOM
 * @param {array} dinos dinos data array
 * @param {object} human form input values
 */
function displayGrid(dinos, human) {
  const grid = document.querySelector("#grid");

  const tileData = [...dinos.slice(0, 4), human, ...dinos.slice(4)];
  const tiles = tileData
    .map((tile) => {
      return `
        <div class="grid-item">
          <h3>${tile.species || tile.name}</h3>
          <img src="images/${tile.speciesLowercase || "human"}.png">
          <p style="${
            typeof tile.fact === "undefined" ? "display: none" : ""
          }">${getRandomFact(tile)}</p>
        </div>`;
    })
    .join("");

  grid.innerHTML = tiles;
}

/**
 * @description clears form inputs & error messages
 * from the DOM
 */
function clearForm() {
  const fields = document.querySelectorAll("input");
  const validation = document.querySelector(".validation");
  const validationSpecific = document.querySelector(".validation-specific");
  fields.forEach((field) => (field.value = ""));
  validation.innerHTML = "";
  validationSpecific.innerHTML = "";
}

/**
 * @description adds the refresh button to the DOM,
 * under the grid
 */
function displayRefreshBtn() {
  const form = document.querySelector("#dino-compare");
  const refreshBtn = document.createElement("div");
  refreshBtn.innerHTML = `<h1>Start over</h1>`;
  refreshBtn.classList.add("start-over");
  refreshBtn.classList.add("btn");
  document.querySelector("footer").prepend(refreshBtn);

  refreshBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    refreshBtn.style.display = "none";
    form.style.display = "block";
  });
}

/**
 * @description a flag that comfirms the form is complete or incomplete
 * @param {object} human for input values
 * @returns {boolean}
 */
function isFormComplete(human) {
  const errorField = document.querySelector(".validation-specific");
  const { name, feet, inches, weight } = human;
  let isComplete = false;
  if (!name) {
    errorField.innerHTML = `<p>Please fill out your name, human</p>`;
  } else if (feet < 1) {
    errorField.innerHTML = `<p>Feet must be a number greater than 0</p>`;
  } else if (inches < 0) {
    errorField.innerHTML = `<p>Inches must be a number 0 or greater</p>`;
  } else if (weight < 1) {
    errorField.innerHTML = `<p>Weight must be a number greater than 0</p>`;
  } else {
    isComplete = true;
  }
  return isComplete;
}

/**
 * @description an IIFE to get human data from form on btn-click
 * intializes form validation functionality & displays the grid
 */
(function () {
  const container = document.querySelector(".validation");
  const compareBtn = document.querySelector("#btn");
  clearForm();

  // On button click, prepare and display infographic
  compareBtn.addEventListener("click", function () {
    const humanData = getHumanData();
    if (isFormComplete(humanData)) {
      const dinoArray = getDinosaurs(ALL_DINOSAURS, humanData);

      // Remove form from screen
      hideForm();
      displayGrid(dinoArray, humanData);
      displayRefreshBtn();
      clearForm();
    } else {
      // attach appropriate error messages
      container.innerHTML = `<span class="error">Please complete all fields</span>`;
    }
  });
})();

/** =============== Features to come ====================== **
 *
 * TODO: add comments above functions: i.e. @param {Object} @returns {Object}, etc
 * TODO: make element references DRY
 * Future todo: add a hover state to display the rest of the facts
 *
 * LEARNED: use data to control UI instead of relying on dom manipulation for everything
 *
 * ======================================================== **/
