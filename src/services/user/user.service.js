const User = require("../../models/user.model");

/**
 * Gets all users with given query
 * @param {*} getQuery The object of queries to filter user
 * @param {*} options other data passed
 */
function get(getQuery, model, options = {}) {
  const limit = options.limit || 100;
  const skip = limit * options.page || 0;
  return model
    .find(getQuery)
    .skip(skip)
    .limit(limit)
    .exec();
}

/**
 * Creates new user and returns user
 * @param {object} userData The object that contains information about user to be created
 */
function create(userData, model, options = {}) {
  const newModel = new model(userData);
  return newModel.create();
}

/**
 * Updates user by given id and returns user
 * @param {string} userId The string that represents the id of user
 * @param {object} userData The object that contains information about user to be created
 */
function update(userId, userData) {
  userData.updatedAt = Date.now();
  return User.findByIdAndUpdate(userId, userData, { new: true }).exec();
}

/**
 * Gets user by given query
 * @param {string} userId The string which represents id of user
 * @param {string} options The query passed for user search
 */

function getOne(userId, model, options = {}) {
  return model.findOne({ _id: userId, ...options }).exec();
}

/**
 * Gets user by given id
 * @param {string} userId The string which represents id of user
 */

function findById(userId, options = {}) {
  return User.findById(userId).exec();
}

/**
 * Removes user by given id
 * @param {string} userId The string which represents id of user
 * @param {object} data The data passed to be modified
 */

function deleteOne(userId, data) {
  data.isDeleted = true;
  data.deletedAt = Date.now();
  return User.findOneAndUpdate({ _id: userId }, data, { new: true }).exec();
}

const userService = {
  get,
  create,
  update,
  getOne,
  findById,
  deleteOne,
};

module.exports = userService;
