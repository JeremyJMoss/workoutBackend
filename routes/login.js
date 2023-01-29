const express = require("express");
const mySQLController = require("../controllers/mySQL");
const router = express.Router();

router.post("/authenticateLogin", mySQLController.authenticateUser);


module.exports = router;