const expect = require("chai").expect;
const apiHelper = require("../../api-authentication");
const ADDRESS_PATH = require("../../endpoints").address;

describe("Test error scenarios for Address endpoint", () => {
  it("request with invalid API key should not be authenticated", async () => {
    const headers = await apiHelper.createHeaders({
      requestPath: ADDRESS_PATH,
      key: "invalid-key",
    });
    const options = await apiHelper.createOptions({
      requestPath: ADDRESS_PATH,
      requestHeaders: headers,
    });

    const response = await apiHelper.sendRequest(options);
    expect(response.status).to.be.equal(403);
    expect(response.message).to.be.equal("Your API authentication is invalid");
  });

  it("request with invalid password should not be authorized", async () => {
    const headers = await apiHelper.createHeaders({
      requestPath: ADDRESS_PATH,
      password: "invalid-password",
    });

    const options = await apiHelper.createOptions({
      requestPath: ADDRESS_PATH,
      requestHeaders: headers,
    });

    const response = await apiHelper.sendRequest(options);
    expect(response.status).to.be.equal(401);
    expect(response.message).to.be.equal("The user account is not authorized");
  });

  it("request with invalid secret should throw error", async () => {
    const headers = await apiHelper.createHeaders({
      requestPath: ADDRESS_PATH,
      secret: "invalid-secret",
    });
    const options = await apiHelper.createOptions({
      requestPath: ADDRESS_PATH,
      requestHeaders: headers,
    });

    const response = await apiHelper.sendRequest(options);
    expect(response.status).to.be.equal(400);
    expect(response.message).to.be.equal("Digest is not valid");
  });

  it("request with timestamp older than 60 secs should not be accepted", async () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() - 61); // timestamp
    const headers = await apiHelper.createHeaders({
      requestPath: ADDRESS_PATH,
      timestamp: time.toUTCString(),
    });

    const options = await apiHelper.createOptions({
      requestPath: ADDRESS_PATH,
      requestHeaders: headers,
    });

    const response = await apiHelper.sendRequest(options);
    expect(response.status).to.be.equal(400);
    expect(response.message).to.be.equal("Request is too old");
  });
});
