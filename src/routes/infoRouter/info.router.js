/**
 * All the routes related to info
 */

const express = require("express");
const infoRouter = express.Router();

const infoHandler = require("../../handlers/info/info.handler");
const unknownMethodHandler = require("../../handlers/unknownMethod/unknownMethod.handler");

infoRouter.route("/info").get(infoHandler.getAppInfo);
infoRouter.all("/info", unknownMethodHandler.methodNotAllowed);

module.exports = infoRouter;
