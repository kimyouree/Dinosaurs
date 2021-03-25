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

  }
// Create Dino Objects

// Create Human Object

// Use IIFE to get human data from form

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.

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
// Generate Tiles for each Dino in Array

// Add tiles to DOM

// Use IIFE to get human data from form
(function() {
  const container = document.querySelector(".field-error");
  const compareBtn = document.querySelector("#btn");
  const fields = document.querySelectorAll("input");
  fields.forEach(input => input.addEventListener("keyup", checkValidation));


  // On button click, prepare and display infographic
  compareBtn.addEventListener("click", function() {
      const humanData = getHumanData();
      console.log(humanData);
      let dinoArray = getDinosaurs(dinoData, humanData);

// Remove form from screen
})();

// On button click, prepare and display infographic
