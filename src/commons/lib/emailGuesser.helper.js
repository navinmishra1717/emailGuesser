/**
 *
 * Helper functions for email guesser
 */
// constants
const constants = require("./constants");

const splitFullname = fullname => {
  const splitName = fullname && fullname.split(" ");
  const firstname = splitName[0];
  const lastname = splitName.length > 1 ? splitName[splitName.length - 1] : "";
  const forMiddle = splitName.slice(1, -1);
  const middlename = forMiddle.length ? forMiddle.join(" ") : "";
  return {
    fn: firstname.toLowerCase(),
    mn: middlename.toLowerCase(),
    ln: lastname.toLowerCase(),
  };
};

const getEmailPattern = (fullname, email) => {
  let pattern;
  const { fn, mn, ln } = splitFullname(fullname);
  const splitEmail = email && email.split("@")[0];
  if (splitEmail === fn) {
    pattern = constants.first;
  } else if (splitEmail === `${fn}.${mn}`) {
    pattern = constants.firstAndMiddle;
  } else if (splitEmail === `${fn}.${ln}`) {
    pattern = constants.firstAndLast;
  } else {
    pattern = constants.full;
  }
  return pattern;
};

module.exports = { splitFullname, getEmailPattern };
