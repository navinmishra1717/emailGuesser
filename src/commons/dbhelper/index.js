const mongoose = require("mongoose");
const connectDb = require("./connectDb");
const config = require("../../config");
const handleEvents = require("./handleEvents");

function createConnection() {
  connectDb(mongoose, config);
  let db = mongoose.connection;
  handleEvents(db);
}
const database = {
  createConnection: createConnection
};
module.exports = database;
