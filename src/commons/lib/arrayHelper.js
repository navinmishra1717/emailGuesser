/**
 * Checks if array1 is subarray of array 2
 * @param {array} array1 Array to be checked for subarray
 * @param {array} array2 Is main array
 */
const checkSubArray = (array1, array2) => {
  if (array1 && array2) {
    if (array1.length && array2.length) {
      return array1.every(needle => array2.includes(needle));
    }
    return false;
  }
};

module.exports = { checkSubArray };
