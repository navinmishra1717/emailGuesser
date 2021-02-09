/**
 * Only imports all the response files and exports
 */

const errorResponse = require("./error.response");
const successResponse = require("./success.response");

const response = {
  errorResponse: errorResponse,
  successResponse: successResponse
};

module.exports = response;
