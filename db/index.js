// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// Requires the MongoDB URL from .env file
require('dotenv').config();

// >> ADDED MONGODB ATLAS CONNECTION URL
const MONGODB_URI="mongodb+srv://brrrun:Bp3er45ty6.@parcipe1.wyr5t0l.mongodb.net/?retryWrites=true&w=majority"

// Connects the app to the MondoDB database
mongoose //process.env.MONGODB_URI
  .connect(MONGODB_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
