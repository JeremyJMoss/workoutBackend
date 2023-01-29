const bodyParser = require('body-parser');
const cors = require("cors");
const express = require('express');
const loginRoutes = require("../routes/login");
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(loginRoutes);

module.exports = app;