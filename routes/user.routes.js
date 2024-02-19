const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = ("../models/User.model")

    // Creates a new Profile / Sign Up
    router
    .post("/profile/new", (req, res)=>{
        const {username, email, password} = req.body;

    User
    .create({username, email, password})
    .then((newUser) => res.json(newUser))
    .catch((error) => res.json(500).json({error: "Failed to created profile", details: error}))
    });


module.exports = router;