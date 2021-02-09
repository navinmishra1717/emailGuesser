const { errorResponse } = require("../../commons/response");

const unknownMethodHandler = {
  methodNotAllowed: function(req, res) {
    const message = "Method not allowed";
    errorResponse(res, message, { status: 405 });
  }
};

module.exports = unknownMethodHandler;
