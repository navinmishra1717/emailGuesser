//  Takes the environemnt variables from the env file and defaultConfig to
const dotenv = require("dotenv").config();
const defaultConfig = require("./default");
const dbConfig = require("./db");
const infoConfig = require("./appInfo");

module.exports = {
  ...dotenv.parsed,
  ...defaultConfig,
  ...dbConfig,
  ...infoConfig
};
