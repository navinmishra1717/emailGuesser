/*eslint-disable*/
const userServices = require("../../../services/user/user.service");

describe("Test suite for emailGuesser service", () => {
  it("returns email data with count for given data", async () => {
    // mock inputs
    const mockData = {
      fullname: "Robert Downey Junior",
      domain: "ironman.com",
    };
    const userData = [
      {
        email: "robert.junior@ironman.com",
        count: 5,
      },
      {
        email: "robert.downey@gmail.com",
        count: 4,
      },
      {
        email: "robert.downey.junior@ironman.com",
        count: 2,
      },
      {
        email: "robert@ironman.com",
        count: 3,
      },
    ];
    // create required mock functions
    const getFunction = function() {
      return userData;
    };
    const mockUserModel = {
      patternCount: function() {
        return 5;
      },
    };
    const expectedData = {
      email: "robert.junior@ironman.com",
      count: 5,
    };
    const emailData = await userServices.emailGuesser(
      mockData,
      mockUserModel,
      {},
      { getFunction: getFunction }
    );
    expect(emailData.email).toEqual(expectedData.email);
    expect(emailData.count).toEqual(expectedData.count);
  });
});
