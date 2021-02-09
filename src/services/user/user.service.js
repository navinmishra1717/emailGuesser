//model
const User = require("../../models/user.model");

// helper
const {
  splitFullname,
  getEmailPattern,
} = require("../../commons/lib/emailGuesser.helper");

/**
 * Gets all users with given query
 * @param {object} getQuery The object of queries to filter user
 * @param {object} model The model passed
 * @param {object} options other data passed
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
 * @param {object} model The model passed
 * @param {object} options other data passed
 */
async function create(userData, model, options = {}) {
  const pattern = getEmailPattern(userData.fullname, userData.email);
  const counter = await User.patternCount(pattern);
  userData.emailPattern = `${pattern}: ${counter + 1}`;
  const newModel = new model(userData);
  const newUser = newModel.create();
  return newUser;
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
 * @param {object} model The model passed
 * @param {object} options The query passed for user search
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

/**
 *
 * @param {object} data The object passed with data field
 * @param {object} model The model passed need to access
 * @param {object} query Query string passed
 */
async function emailGuesser(data = {}, model, query) {
  const { fn, mn, ln } = splitFullname(data.fullname);
  const fullnameArr = [fn, mn, ln];
  // get users with given domain
  const users = await get(
    {
      email: { $regex: new RegExp(`^[A-Za-z0-9._%+-]+@${data.domain}$`) },
      ...query,
    },
    model
  );
  // now get all the possible combinations of emails and get their count
  const userDetails = [];
  for (let i = 0; i < users.length; i++) {
    const names = users[i].email && users[i].email.split("@")[0];
    if (fullnameArr.includes(...names.split("."))) {
      const pattern =
        users[i].emailPattern && users[i].emailPattern.split(":")[0];
      const count = await User.patternCount(pattern);
      userDetails.push({ email: users[i].email, count: count });
    }
  }
  // for pattern with highest count
  const maxCount = Math.max.apply(
    Math,
    userDetails.map(each => each.count)
  );
  return userDetails.find(e => e.count === maxCount);
}

const userService = {
  get,
  create,
  update,
  getOne,
  findById,
  deleteOne,
  emailGuesser,
};

module.exports = userService;
