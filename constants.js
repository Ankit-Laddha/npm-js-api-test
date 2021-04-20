 
// Ideally one would store the secrets, password and API_key in environment variables and not commit it to repository
const API_URL = "https://demoapi.finoa.io";
 const USER = "quixote.rocinante";
 const PASSWORD = "rO4mWhT2mm";
 const API_KEY = "a1699852-1947-45b3-a9fb-a18f86d2a913";
 const API_SECRET = "Quixote de la Mancha";

// API part to be tested
 const method = "GET";
 const body = {};

module.exports = { API_SECRET, API_URL, API_KEY, USER, PASSWORD, method, body}