/**
 * All the routes used for user
 */

const express = require("express");
const userHandler = require("../../handlers/user/user.handler");
const userRouter = express.Router();

const thisRoute = "/users";
userRouter
  .route(thisRoute)
  .get(userHandler.getAllUsers)
  .post(userHandler.createUser);

userRouter
  .route(`${thisRoute}/:id`)
  .get(userHandler.getOneById)
  .put(userHandler.updateUser)
  .delete(userHandler.deleteOne);

module.exports = userRouter;
