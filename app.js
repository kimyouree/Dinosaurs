import dinoData from "./dino.js";
import Dinosaur from "./classes/Dinosaur.js";

// Create Dino Objects
function getDinosaurs(data, humanData) {
  // turn this into a factory function (design patterns - sohamkamani)
  let dinosaurs = data["Dinos"].map(
    dinoData => new Dinosaur(dinoData, humanData)
  );
  return dinosaurs;
}

// Create Human Object
function getHumanData() {
  // should I try moving this into the IIFE to see if globals are still exposed?
  const [name, feet, inches, weight] = document.querySelectorAll("input");
  const diet = document.querySelector("select");

  return {
    name: name.value,
    feet: Number(feet.value),
    inches: Number(inches.value),
    weight: Number(weight.value),
    diet: diet.value
  };
}

function hideForm() {
  const form = document.querySelector("#dino-compare");
  form.style.display = "none";
}

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
      return `The ${tileData.species} was ${tileData.weightRatio} ${
        tileData.weightRatio > 1 ? "taller" : "shorter"
      } than you.`;
    case 4:
      return `The ${tileData.species} existed during the ${tileData.when} period.`;
    default:
      return `The ${tileData.species} lived in ${tileData.where}.`;
  }
}

function displayGrid(dinos, human) {
  const grid = document.querySelector("#grid");

  // Generate Tiles for each Dino in Array
  const tileData = [...dinos.slice(0, 4), human, ...dinos.slice(4)];
  const tiles = tileData
    .map(tile => {
      return `
        <div class="grid-item">
          <h3>${tile.species || tile.name}</h3>
          <img src="images/${tile.species || "human"}.png">
          <p style="${
            typeof tile.fact === "undefined" ? "display: none" : ""
          }">${getRandomFact(tile)}</p>
        </div>`;
    })
    .join("");

  // Add tiles to DOM
  grid.innerHTML = tiles;
}

function clearForm() {
  const fields = document.querySelectorAll("input");
  const validation = document.querySelector(".validation");
  const validationSpecific = document.querySelector(".validation-specific");
  fields.forEach(field => (field.value = ""));
  validation.innerHTML = "";
  validationSpecific.innerHTML = "";
}

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
    clearForm();
    form.style.display = "block";
  });
}

function isFormComplete(human) {
  const errorField = document.querySelector(".validation-specific");
  const { name, feet, inches, weight } = human;
  let isComplete = false;
  if (!name) {
    errorField.innerHTML = `<p>Please fill out your name, human</p>`;
  } else if (feet < 1) {
    errorField.innerHTML = `<p>Feet must be a number</p>`;
  } else if (inches < 1) {
    errorField.innerHTML = `<p>Inches must be a number</p>`;
  } else if (weight < 1) {
    errorField.innerHTML = `<p>Weight must be a number</p>`;
  } else {
    isComplete = true;
  }
  return isComplete;
}

// Use IIFE to get human data from form
(function() {
  const container = document.querySelector(".validation");
  const compareBtn = document.querySelector("#btn");

  clearForm();

  // On button click, prepare and display infographic
  compareBtn.addEventListener("click", function() {
    const humanData = getHumanData();
    if (isFormComplete(humanData)) {
      let dinoArray = getDinosaurs(dinoData, humanData);

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

/**
 * TODO: add comments above functions: i.e. @param {Object} @returns {Object}, etc
 * TODO: add a re-launch button, refactor it
 * TODO: make element references DRY
 * TODO: add a hover state to display the rest of the facts
 * TODO: refactor
 * - invert color scheme so error styles nicely contrast
 * - rename error classes & style selectors
 */
