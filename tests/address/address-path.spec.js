const expect = require("chai").expect;
const apiHelper = require("../../api-authentication");
const ADDRESS_PATH = require("../../endpoints").address;

describe("Test address path parameter for Address endpoint", () => {
  it("request for specific address should be success", async () => {
    const address = "b4614d5d02f49aa66bc3a7402a0b3a3bb85e95a4";
    const path = `${ADDRESS_PATH}/${address}`;
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
    expect(body).to.have.lengthOf(1);
    expect(body[0].Address).to.be.equal(address);
  });

  it("request without specific address and parameters should be success", async () => {
    const headers = await apiHelper.createHeaders({
      requestPath: ADDRESS_PATH,
    });

    const options = await apiHelper.createOptions({
      requestPath: path,
      requestHeaders: ADDRESS_PATH,
    });

    const response = await apiHelper.sendRequest(options);
    expect(response.status).to.be.equal(200);
    const body = JSON.parse(response.body);
    expect(body).to.have.length.greaterThan(0);
  });

  it("request for specific address and a single currency should be success", async () => {
    const address = "b4614d5d02f49aa66bc3a7402a0b3a3bb85e95a4";
    const currency = "BTC";
    const path = `${ADDRESS_PATH}/${address}?Currency=${currency}`;
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
