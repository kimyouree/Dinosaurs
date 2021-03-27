/**
 * @description Create Dino class to create dinos
 * @constructor
 * @param {object} dinoObj - object holding a specific dino's details
 * @param {object} humanData - object holdings form input values
 * @returns {object} a new dino with properties relative to the human's
 */
export default class Dinosaur {
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
