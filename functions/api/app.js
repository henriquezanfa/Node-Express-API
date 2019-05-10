/******************************************************************/

const express = require("express");
const db = require("./db/db");
const bodyParser = require('body-parser');
const router = require('./routes/index')

const app = express();

/******************************************************************/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router)

module.exports = app

/******************************************************************/