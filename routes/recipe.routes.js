const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');

const storage = multer.memoryStorage(); // Store file data in memory as Buffer
const upload = multer({ storage: storage });

const Recipe = require("../models/Recipe.model");


        // Fetches ALL Recipes
router.get("/recipes", (req, res)=>{
        Recipe
        .find({})
        .then((recipes) => res.json(recipes))
        .catch((error) => res.json(error));
});


        // Fetches ID Specific Recipe
router.get("/recipe/:_id", (req, res)=>{
        const {_id} = req.params;
        Recipe
        .findById(_id)
        .then((recipe) => res.json(recipe))
        .catch((error) => res.json(error));
})


        // Creates a new Recipe
router.post("/new", upload.array('images', 5), (req, res) => {
        const { title, tags, time, servings, difficulty, ingredients, language, cuisine, image, instructions, _id } = req.body;
        const recipeData = { 
                title, 
                tags, 
                time, 
                servings, 
                difficulty, 
                ingredients, 
                image,
                language, 
                cuisine, 
                instructions 
            };

        Recipe
        .create(recipeData)
        .then((newRecipe) => res.json(newRecipe))
        .catch((error) => res.status(500).json({ error: "Failed to create recipe", details: error }));
});


console.log('Recipe route hit');


module.exports = router;