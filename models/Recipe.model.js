const { Schema, model } = require("mongoose")

const recipeSchema = new Schema({
    title: {
        type: String,
    },
    tags: [String],
    time: {
        hours: {
            type: Number,
        },
        minutes: {
            type: Number,
        },
    },
    servings: {
        type: Number,
    },
    difficulty: {
        type: String,
    },
    ingredients: [{
        name: {
            type: String,
        },
        amount: {
            type: Number,
        },
        unit: {
            type: String,
        },
    }],
    language: String,
    cuisine: String,
    image: [], 
    instructions: {
        type: String,
    },
    saveDate: {
        type: Date,
        default: Date.now,
      },
    creator: { 
        type: String,
    },
});

console.log('Recipe Model Imported');


const Recipe = model("Recipe", recipeSchema);

module.exports = Recipe;