// import required dependencies
const fs = require("fs");
const request = require("request");
const CONSTANTS = require("./constants");
const crypto = require("crypto");

// CONSTANTS
const API_URL = "https://demoapi.finoa.io";

/**
 * {function} createAuthentication - Creates an object that contains the required authentication headers for a request
 * to the API.
 *
 * @param {string} user
 * @param {string} password
 * @param {string} secret
 * @param {string} requestMessage
 *
 * @return {object}
 */
const createAuthentication = function (user, password, secret, requestMessage) {
  const basicAuthorization = Buffer.from(
    user + ":" + password,
    "utf-8"
  ).toString("base64");

  const apiDigest = crypto
    .createHmac("sha256", secret)
    .update(requestMessage)
    .digest("hex");

  return {
    Authorization: "Basic " + basicAuthorization,
    "Finoa-Api-Digest": apiDigest,
  };
};

/**
 * {function} createHeaders - Creates headers for the request based on the given parameters.
 *
 * @param {string} requestPath - API path to which the request is directed
 * @param {string} requestMethod - HTTP request type of the request
 * @param {object} requestBody - Body of the request
 * @param {string} user - User to be used to authenticate at the API
 * @param {string} password - Password to be used to authenticate at the API
 * @param {string} key - API key to be used to authenticate at the API
 * @param {string} secret - API secret to be used to authenticate at the API
 * @param {string} timestamp - Timestamp to be used within the request
 */
const createHeaders = async function (params) {
  const requestPath = params.requestPath;
  const requestMethod = params.requestMethod || CONSTANTS.method;
  const requestBody = params.requestBody || "";
  const user = params.user || CONSTANTS.USER;
  const password = params.password || CONSTANTS.PASSWORD;
  const key = params.key || CONSTANTS.API_KEY;
  const secret = params.secret || CONSTANTS.API_SECRET;
  const timestamp = params.timestamp || new Date().toUTCString();

  console.log("\n\nHEADERS-secret: " + JSON.stringify(timestamp));
  let stringifiedRequestBody = "";
  if (["POST", "PUT"].indexOf(requestMethod) > -1) {
    stringifiedRequestBody = JSON.stringify(requestBody);
  }

  // calculate message out of request
  const message =
    timestamp + requestMethod + requestPath + stringifiedRequestBody;

  // create headers for request, including authentication
  const headers = Object.assign(
    {
      Date: timestamp,
      "Finoa-Api-Key": key,
    },
    createAuthentication(user, password, secret, message)
  );

  console.log("\nHEADERS-ABC: " + JSON.stringify(headers));
  return headers;
};

/**
 * {function} createOptions - Creates options object based on the given parameters.
 *
 * @param {string} requestPath - API path to which the request is directed
 * @param {string} requestMethod - HTTP request type of the request
 * @param {object} requestBody - Body of the request
 * @param {object} requestHeaders - Headers to be used for the request
 */
const createOptions = async function (params) {
  const requestPath = params.requestPath;
  const requestMethod = params.requestMethod || CONSTANTS.method;
  const requestBody = params.requestBody || "";
  const requestHeaders = params.requestHeaders;

  console.log("\nOptions-ABC-path: " + JSON.stringify(requestPath));
  console.log("\nOptions-ABC-headers: " + JSON.stringify(requestHeaders));
  // create request options
  return {
    url: API_URL + requestPath,
    method: requestMethod,
    body: requestBody != "" ? requestBody : undefined,
    headers: requestHeaders,
  };
};

/**
 * {function} sendRequest - Sends a request to the API based on the given parameters.
 *
 * @param {object} options - API path to which the request is directed
 */
const sendRequest = async function (options) {
  //console.log("\n\nSEND-ABC-OPTIONS: " + JSON.stringify(options));
  let res;
  // send request
  await new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err == undefined) {
        //console.log("\n\nSEND-success: " + JSON.stringify(res));
        resolve({
          status: res.statusCode,
          message: res.statusMessage,
          body: body,
        });
      } else {
        console.log("\n\nSEND-ERR: " + JSON.stringify(err));
        reject({
          error: err,
          status: res.statusCode,
          message: res.statusMessage,
        });
      }
    });
  }).then((response) => {
    // handle the response
    res = response;
    console.log("status: " + response.status);
    console.log("message: " + response.message);
    console.log("body: ");
    console.log(response.body);
  });

  return res;
};

module.exports = { createHeaders, createOptions, sendRequest };