// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// >> ADDED CORS CONFIG
const express = require("express");
const app = express();

const cors = require("cors");
const allowedOrigins = {"Access-Control-Allow-Origin": "*"};
const corsOptions = {
  origin: allowedOrigins
};
app.use(cors(corsOptions));


// Increase the maximum size of the request body to 10MB
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/parcipe", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const recipeRoutes = require("./routes/recipe.routes");
app.use("/parcipe", recipeRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/parcipe", userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
