/* imports */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const consign = require('consign');

/* create express application */
const app = express();

/* express settings */
app.use(bodyParser.json());
app.use(cors());

/* load environment variables */
require('dotenv-safe').config();

/* auto-load files */
consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/services/connectionUpdate.js')
    .into(app);

/* exports */
module.exports = app;