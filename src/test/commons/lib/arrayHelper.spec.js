/*eslint-disable */
// unit test using jest
const { checkSubArray } = require("../../../commons/lib/arrayHelper");

describe("Test suite to check for subarray", () => {
  it("checks if an array is subarray of another", () => {
    const array1 = ["a", "b", "c"];
    const array2 = ["a", "d", "g", "c", "h", "b"];
    const array3 = ["a", "d", "g", "h"];

    const output1 = checkSubArray(array1, array2);
    const output2 = checkSubArray(array1, array3);
    expect(output1).toEqual(true);
    expect(output2).toEqual(false);
  });
});
