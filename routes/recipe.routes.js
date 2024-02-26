const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');

const storage = multer.memoryStorage(); // Store file data in memory as Buffer
const upload = multer({ storage: storage });

const Recipe = require("../models/Recipe.model");
const User = require("../models/User.model");


        // Fetches ALL Recipes
router
        .get("/recipes", (req, res)=>{
        Recipe
        .find({})
        .then((recipes) => res.json(recipes))
        .catch((error) => res.json(error));
});


        // Fetches ID Specific Recipe
router
        .get("/recipe/:_id", (req, res)=>{
        const {_id} = req.params;
        Recipe
        .findById(_id)
        .populate("user")
        .exec()
        .then((recipe) => res.json(recipe))
        .catch((error) => res.json(error));
})


        // Creates a new Recipe
router
        .post("/new", upload.array('images', 5), async (req, res) => {
        try {
        const { title, tags, time, servings, difficulty, ingredients, language, cuisine, image, instructions, saveDate, creator } = req.body;
        const recipeData = { title, tags, time, servings, difficulty, ingredients, image, language, cuisine, instructions, saveDate, creator };
        
        const newRecipe = await Recipe.create(recipeData);
        if(!newRecipe) {
            return res.status(500).json({ error: "Failed to create recipe" });
        }

        await User.findByIdAndUpdate(creator, { $push: { createdRecipes: newRecipe._id } });
                res.json(newRecipe);
                
        } catch (error) {
                res.status(500).json({ error: "Failed to create recipe", details: error });
        }
});
              

console.log('Recipe route hit');


module.exports = router;