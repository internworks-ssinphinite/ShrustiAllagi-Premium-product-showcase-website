// api/index.js
const serverless = require('serverless-http');
const app = require('../src/app'); // path to exported Express app

module.exports = serverless(app);
