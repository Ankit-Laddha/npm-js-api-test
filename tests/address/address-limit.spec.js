const expect = require("chai").expect;
const apiHelper = require("../../api-authentication");
const ADDRESS_PATH = require("../../endpoints").address;

describe("Test limit parameters for Address endpoint", () => {
  it("request for limit parameter should be success", async () => {
    const limit = 3;
    const path = `${ADDRESS_PATH}?Limit=${limit}`;

    const headers = await apiHelper.createHeaders({
      requestPath: path,
    });

    const options = await apiHelper.createOptions({
      requestPath: path,
      requestHeaders: headers,
    });

    const response = await apiHelper.sendRequest(options);
    expect(response.status).to.be.equal(200);
  });
});
