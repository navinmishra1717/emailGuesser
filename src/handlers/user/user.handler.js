const userService = require("../../services/user/user.service");
const userModel = require("../../models/user.model");
const logger = require("../../commons/logger");
const log = logger.log;
const Response = require("../../commons/response");

/**
 * This function gets all the users in the system
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next function to call next middleware
 */
async function getUsers(req, res, next) {
  try {
    let query = { isDeleted: false };
    const users = await userService.get(query, userModel);
    log.info("Get users success");
    Response.successResponse(res, "Get users success", users);
  } catch (err) {
    log.error(err);
    next(err);
  }
}

/**
 * This function create the new user in the system
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next function to call next middleware
 */
async function createUser(req, res, next) {
  let user = req.body;
  try {
    log.info("creating new user");
    user.createdAt = Date.now();
    user.updatedAt = Date.now();
    const newUser = await userService.create(user, userModel);
    const msg = "user created successfully";
    log.info(msg);
    return Response.successResponse(res, msg, newUser);
  } catch (err) {
    log.error(err);
    next(err);
  }
}

/**
 * This function updates the user with given id in the system
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next function to call next middleware
 */

async function updateUser(req, res, next) {
  const userId = req.params.id;
  const updateData = req.body;
  try {
    const isExistingUser = await userService.getOne(userId, userModel, {
      isDeleted: false,
    });
    if (!isExistingUser) {
      return Response.errorResponse(res, "user doesnot exists!!");
    }
    log.info(`updating user with id:${userId}`);
    const newUser = await userService.update(userId, updateData);
    Response.successResponse(
      res,
      `update user success with id:${userId}`,
      newUser
    );
  } catch (err) {
    log.error(err);
    next(err);
  }
}

/**
 *
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next next function
 */

async function getOneById(req, res, next) {
  const id = req.params.id;
  try {
    const query = { isDeleted: false };
    const user = await userService.getOne(id, userModel, query);
    const msg = "Get user by id success!!";
    log.info(msg);
    Response.successResponse(res, msg, user);
  } catch (err) {
    log.error(err);
    next(err);
  }
}

/**
 *
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next next function
 */

async function deleteOne(req, res, next) {
  const userId = req.params.id;
  try {
    const userData = await userService.getOne(userId, userModel, {
      isDeleted: false,
    });
    if (!userData) {
      return Response.errorResponse(res, "user not found");
    }
    await userService.deleteOne(userId, userData);
    const msg = "Delete user by id success!!";
    log.info(msg);
    Response.successResponse(res, msg);
  } catch (err) {
    log.error(err);
    next(err);
  }
}

/**
 *
 * @param {object} req request object
 * @param {object} res response object
 * @param {function} next next function
 */
async function emailGuesser(req, res, next) {
  const { fullname, domain } = req.query;
  try {
    const query = { isDeleted: false };
    const email = await userService.emailGuesser(
      { fullname, domain },
      userModel,
      query
    );
    const msg = "Email successfully guessed!!";
    log.info(msg);
    Response.successResponse(res, msg, email);
  } catch (err) {
    log.error(err);
    next(err);
  }
}

const userHandler = {
  getAllUsers: getUsers,
  createUser: createUser,
  updateUser: updateUser,
  getOneById: getOneById,
  deleteOne: deleteOne,
  emailGuesser: emailGuesser,
};

module.exports = userHandler;
