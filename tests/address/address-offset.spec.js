const expect = require("chai").expect;
const apiHelper = require("../../api-authentication");
const ADDRESS_PATH = require("../../endpoints").address;

describe("Test offset parameters for Address endpoint", () => {
  it("request for specific address and offset should be success", async () => {
    const address = "b4614d5d02f49aa66bc3a7402a0b3a3bb85e95a4";
    const currency = "BTC";
    const offset = 1;
    const path = `${ADDRESS_PATH}/${address}?Currency=${currency}?Offset=${offset}`;

    const headers = await apiHelper.createHeaders({
      requestPath: path,
    });

    const options = await apiHelper.createOptions({
      requestPath: path,
      requestHeaders: headers,
    });

    const response = await apiHelper.sendRequest(options);
    expect(response.status).to.be.equal(200);
    const body = JSON.parse(response.body);
    expect(body).to.have.lengthOf(0);
  });
});
