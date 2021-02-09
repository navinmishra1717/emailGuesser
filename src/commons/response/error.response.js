/**
 *
 * @param {object} res response object
 * @param {string} msg error message
 * @param {object} options other options
 */

const errorResponse = (res, msg = "", options = {}) => {
  const status = +options.status || 400;
  return res.status(status).json({ error: msg });
};

module.exports = errorResponse;
