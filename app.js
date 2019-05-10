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


/******************************************************************/

const PORT = 500

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
})

/******************************************************************/