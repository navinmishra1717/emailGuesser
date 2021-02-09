/**
 * Router index file
 * Lists all the routes of API
 * Handles 404 routes
 */

const express = require("express");
const router = express.Router();
const notFoundHandler = require("../handlers/notFound/notFound.handler");

// import all the routes
const infoRouter = require("./infoRouter/info.router");
const userRouter = require("./userRouter/user.router");

// router level middlewares
// register the routes
router.all("/info/", infoRouter);
router.all("/users*", userRouter);

// If nothing processed from above, 404 response will be generated by notFoundHandler
router.all("*", notFoundHandler.notFound);

module.exports = router;
