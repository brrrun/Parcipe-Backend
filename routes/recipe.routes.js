const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'p@RCip3' // Replace with your actual secret key
    };
passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
        return done(null, user);
        } else {
        return done(null, false);
        }
} catch (error) {
        return done(error, false);
}
}));
// Initialize Passport middleware
router.use(passport.initialize());

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
        .populate("creator")
        .exec() 
        .then((recipe) => res.json(recipe))
        .catch((error) => res.json(error));
})

        // Fetches Authenticated User createdRecipes
router
        .get("/user/recipes/:_id", (req, res) => {
        const { _id } = req.params;
        Recipe
        .find({ creator: _id }) 
        .then((recipes) => res.json(recipes))
        .catch(() => res.status(500).json({ error: 'Internal Server Error' }));
});

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

        // Deletes a Recipe
router
        .delete("/delete/recipe/:_id", (req, res) => {
        const {_id} = req.params;
        Recipe
        .findByIdAndDelete({_id})
        .then(() => res.json({message: "Recipe deleted successfully"}))
        .catch((error) => res.json(error));
});
              
        // Edits a Recipe
router
        .put("/edit/:_id", (req, res) => {
        const { _id } = req.params;
        const { title, tags, time, servings, difficulty, ingredients, language, cuisine, image, instructions, saveDate, creator } = req.body;
        Recipe
        .findByIdAndUpdate(_id, { title, tags, time, servings, difficulty, ingredients, language, cuisine, image, instructions, saveDate, creator }, { new: true })
        .then((updatedRecipe) => {
                if(!updatedRecipe) {
                    return res.status(404).json({ error: "Recipe not found" });
                }
                res.json(updatedRecipe)})
        .catch((error) => res.status(500).json({ error: "Failed to edit recipe", details: error }));      
});


console.log('Recipe route hit');


module.exports = router;