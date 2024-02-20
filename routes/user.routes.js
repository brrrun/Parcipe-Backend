const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = require("../models/User.model");

// Fetches the user Profile
router.get("/profile/:_id", (req, res) => {
    const { _id } = req.params;
    User.findById(_id)
        .then((user) => res.json(user))
        .catch((error) => res.status(500).json({ error: "Failed to fetch profile", details: error }));
});


// Edits the user Profile
router.put("/profile/:_id/edit", (req, res) => {
    const { _id } = req.params;
    const { username, email, password, createdRecipes } = req.body;
    User.findByIdAndUpdate(_id,
        { username, email, password, createdRecipes },
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