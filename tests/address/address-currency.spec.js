const expect = require("chai").expect;
const apiHelper = require("../../api-authentication");
const ADDRESS_PATH = require("../../endpoints").address;

describe("Test currency parameters for Address endpoint", () => {
  it("request without address and single currency should be success", async () => {
    const currency = "BTC";
    const path = `${ADDRESS_PATH}?Currency=-${currency}`;

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
    expect(body).to.have.length.greaterThan(0);
    expect([currency]).to.have.members(body.map((e) => e.Currency));
  });

  it("request without address and multiple currency should be success", async () => {
    const currency1 = "BTC";
    const currency2 = "ETH";
    const path = `${ADDRESS_PATH}?Currency=${currency1}&Currency=${currency2}`;

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
    expect(body).to.have.length.greaterThan(0);
    expect([currency1, currency2]).to.have.members(body.map((e) => e.Currency));
  });
});
