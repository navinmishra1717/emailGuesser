/*eslint-diable */

const userHandler = require("../../../handlers/user/user.handler");

describe("test suite for emailguesser handler", () => {
  it("returns email with highest count pattern", async () => {
    // mock inputs and data
    const mockData = { email: "robert.junior@ironman.com", count: 3 };
    // mocking required function
    const userServiceMock = {
      emailGuesser: function() {
        return mockData;
      },
    };

    const mockReq = {
      mockFunc: userServiceMock,
      query: {
        fullname: "Robert Downey Junior",
        domain: "ironman.com",
      },
    };
    const mockRes = {
      status: function() {
        return {
          json: function() {
            return mockData;
          },
        };
      },
    };
    const expectedEmailData = {
      email: "robert.junior@ironman.com",
      count: 3,
    };
    const actualEmailData = await userHandler.emailGuesser(mockReq, mockRes);
    expect(actualEmailData.email).toEqual(expectedEmailData.email);
  });
  it("return error response if no matching email found", async () => {
    const mockData2 = {}; //no email case
    const errormsg = "No email found for given name or domain!!";
    const userServiceMock2 = {
      emailGuesser: function() {
        return mockData2;
      },
    };
    const mockReq = {
      mockFunc: userServiceMock2,
      query: {
        fullname: "Robert Downey Junior",
        domain: "ironman.com",
      },
    };
    const mockRes = {
      status: function() {
        return {
          json: function() {
            return errormsg;
          },
        };
      },
    };
    const expectedResponse = errormsg;
    const actualResponse = await userHandler.emailGuesser(mockReq, mockRes);
    expect(actualResponse).toEqual(expectedResponse);
  });
});
