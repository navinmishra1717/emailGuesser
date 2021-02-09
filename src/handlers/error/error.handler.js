const { log } = require("../../commons/logger");
const { errorResponse } = require("../../commons/response");

const errorHandler = (err, req, res, next) => {
  log.error(`Error on ${req.method} ${req.url}`, {
    body: req.body,
    params: req.params,
    query: req.query,
  });
  log.debug(err.stack);
  errorResponse(res, err.message, { status: 500 });
};

module.exports = errorHandler;
