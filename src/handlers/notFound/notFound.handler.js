const { errorResponse } = require("../../commons/response");

const notFound = (req, res) => {
  const message = "route not found";
  errorResponse(res, message, { status: 404 });
};

const notFoundHandler = {
  notFound: notFound
};

module.exports = notFoundHandler;
