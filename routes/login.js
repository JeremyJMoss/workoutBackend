import express from "express";
import mySQLController from "../controllers/mySQL";

const router = express.Router();

router.post("/authenticateLogin", mySQLController.authenticateUser);


export default router;