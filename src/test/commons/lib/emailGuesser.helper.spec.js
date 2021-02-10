/*eslint-disable */
// unit test using jest
const { getEmailPattern } = require("../../../commons/lib/emailGuesser.helper");

describe("Test suite to get email pattern", () => {
  it("returns expected email pattern for given fullname and email", () => {
    const mockFullname = "Robert Downey Junior";
    const mockEmail = "robert.junior@ironman.com";
    const mockEmail2 = "robert.downey.junior@ironman.com";
    const mockEmail3 = "robert.downey@ironman.com";
    const mockEmail4 = "robert@ironman.com";
    const expectedOutput = "{fn}.{ln}@{domain}";
    const expectedOutput2 = "{fn}.{mn}.{ln}@{domain}";
    const expectedOutput3 = "{fn}.{mn}@{domain}";
    const expectedOutput4 = "{fn}@{domain}";

    const actualOutput = getEmailPattern(mockFullname, mockEmail);
    const actualOutput2 = getEmailPattern(mockFullname, mockEmail2);
    const actualOutput3 = getEmailPattern(mockFullname, mockEmail3);
    const actualOutput4 = getEmailPattern(mockFullname, mockEmail4);
    expect(actualOutput).toEqual(expectedOutput);
    expect(actualOutput2).toEqual(expectedOutput2);
    expect(actualOutput3).toEqual(expectedOutput3);
    expect(actualOutput4).toEqual(expectedOutput4);
  });
});
