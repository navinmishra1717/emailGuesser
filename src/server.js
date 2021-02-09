// Main starting file
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const infoChecker = require("./commons/middlewares/infoChecker");
const databaseHelper = require("./commons/dbhelper");
const config = require("./config");
const { log } = require("./commons/logger");
const router = require("./routes");
const errorHandler = require("./handlers/error/error.handler");

// Init database connection
databaseHelper.createConnection();

// Middlewares
app.use(express.static(__dirname)); // built-in middleware
// third party middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// application level middlewares
app.use(infoChecker); // for logging and cleansing

app.all("/*", router);

// Error handling middleware (keep below routes)
app.use(errorHandler);

app.listen(config.apiPort, () => {
  log.info(`Server started on ${config.apiPort}`);
});
