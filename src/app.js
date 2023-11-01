const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors')
const routes = require("./routes");

// to handle the request from the defined origins.
app.use(cors())

// parse data from body in the request.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// logger on console
app.use(morgan("dev"));

// ROUTES
app.use("/api", routes);

module.exports = app;
