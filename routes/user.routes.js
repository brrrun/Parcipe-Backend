const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage(); // Store file data in memory as Buffer
const upload = multer({ storage: storage });

const User = require("../models/User.model");

// Fetches the user Profile
router
    .get("/profile/:_id", (req, res) => {
    const { _id } = req.params;
    User
    .findById(_id)
    .populate("createdRecipes")
    .exec()
    .then(user => {
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    })
    .catch(error => {
        console.error("Failed to fetch profile:", error);
        res.status(500).json({ error: "Failed to fetch profile", details: error });
    });
});

// Edits the user Profile
router
    .put("/profile/:_id/edit", (req, res) => {
        const { _id } = req.params;
        const { username, email, password, createdRecipes, shoppingList } = req.body;
    User
    .findByIdAndUpdate(_id,
        { username, email, password, createdRecipes, shoppingList },
        { new: true })
    .then((updatedUser) => {
        if(!updatedUser){
            return res.status(404).json({ message: "User not found." });
        }
            res.json(updatedUser)
    })
    .catch((error)=> res.status(500).json({ error: "Failed to edit profile", details: error }))
});


module.exports = router;