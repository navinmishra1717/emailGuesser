/**
 *
 * @param {object} res response object
 * @param {string} msg success message
 * @param {object} options other options
 */

const successResponse = (res, msg = "", data, options = {}) => {
  let response = {};
  const status = +options.status || 200;
  return res.status(status).json({ success: true, msg: msg, data: data });
};

module.exports = successResponse;
