import dinoData from "./dino.js";

// Create Dino Constructor
class Dinosaur {
  constructor(dinoObj, humanData) {
    const { species, weight, height, diet, where, when, fact } = dinoObj;
    this.species = species;
    this.height = Number(height);
    this.weight = Number(weight);
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.heightRatio = "height ratio";
    this.weightRatio = "weight ratio";
    this.dietDescription = "What kind of diet did they have?";

    this.compareHeight(humanData);
    this.compareWeight(humanData);
    this.compareDiet(humanData);
  }

  // Create Dino Compare Method 1
  // NOTE: Weight in JSON file is in lbs, height in inches.
  compareHeight(humanData) {
    const { feet, inches } = humanData;
    const humanHeightIn = feet * 12 + inches;
    this.heightRatio = (this.height / humanHeightIn).toFixed(1);
  }

  // Create Dino Compare Method 2
  compareWeight(humanData) {
    this.weightRatio = (this.weight / humanData.weight).toFixed(1);
  }

  // Create Dino Compare Method 3
  compareDiet(humanData) {
    let diet;
    const hasSameDiet = humanData.diet.toLowerCase() === this.diet;
    if (hasSameDiet) {
      this.dietDescription = `You are both ${humanData.diet}s, pretty cool!`;
    } else {
      this.dietDescription = `You're a ${humanData.diet} but the ${this.species} was a ${this.diet}.`;
    }
  }
}

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
  fields.forEach(field => (field.value = ""));
  const fieldError = document.querySelector(".error");
  if (fieldError) fieldError.style.display = "none";
}

function displayRefreshBtn() {
  const form = document.querySelector("#dino-compare");
  const refreshBtn = document.createElement("div");
  refreshBtn.innerHTML = `<h1>Start over</h1>`;
  refreshBtn.classList.add("btn");
  document.querySelector("footer").prepend(refreshBtn);

  refreshBtn.addEventListener("click", () => {
    grid.innerHTML = "";
    refreshBtn.style.display = "none";
    clearForm();
    form.style.display = "block";
  });
}

function isFormComplete() {
  // if fields are complete:
  const fields = document.querySelectorAll("input");
  return Array.from(fields).filter(field => field.value).length === 4;
}

function checkValidation() {
  const isValid = !isNaN(parseInt(this.value));
  const numberErrorMessage = document.querySelector(".error-fine-text");
  if (!isValid && this.type === "number") {
    console.log(numberErrorMessage);
    numberErrorMessage.classList.remove("hidden");
  } else {
    numberErrorMessage.classList.add("hidden");
  }
}

// Use IIFE to get human data from form
(function() {
  const container = document.querySelector(".field-error");
  const compareBtn = document.querySelector("#btn");
  const fields = document.querySelectorAll("input");
  fields.forEach(input => input.addEventListener("keyup", checkValidation));

  clearForm();

  // On button click, prepare and display infographic
  compareBtn.addEventListener("click", function() {
    if (isFormComplete()) {
      const humanData = getHumanData();
      console.log(humanData);
      let dinoArray = getDinosaurs(dinoData, humanData);

      // Remove form from screen
      hideForm();

      displayGrid(dinoArray, humanData);
      displayRefreshBtn();
      clearForm();
    } else {
      // attach appropriate error messages
      container.innerHTML = `<span class="error">Please complete all fields</span>`;
      if (!document.querySelector(".error")) {
        container.appendChild(validateText);
      }
    }
  });
})();

/**
 * DONE: there are globals that are accessible in the console (getHumanData)
 *  - this isn't bc of the JS variables, for some reason typing in the element's #id into the console retrieves it
 * TODO: add comments above functions: i.e. @param {Object} @returns {Object}, etc
 * DONE: randomize fact on dino output
 * TODO: add a re-launch button, refactor it
 * DONE: BUG - why is the grid not re-displaying on refresh try
 * DONE: add form validation
 * DONE: remove erorr styles on refresh
 * TODO: make element references DRY -- maybe pass in `document` to the IFFE / reference it as `d`?
 * DONE: fix heightRatio (happens when empty form fields are submitted)
 * TODO: add a hover state to display the rest of the facts
 * TODO: refactor
 * TODO: push commits
 */
