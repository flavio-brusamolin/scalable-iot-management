const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const consign = require('consign');

const app = express();

app.use(bodyParser.json());

app.use(cors());

consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/services/connectionUpdate.js')
    .into(app);

module.exports = app;