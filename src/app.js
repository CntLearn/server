const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("dev"));

// ROUTES
app.use("/api", routes);

module.exports = app;
