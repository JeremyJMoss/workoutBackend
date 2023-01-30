import express from "express";
import {authenticateUser} from "../controllers/mySQL.js";

const router = express.Router();

router.post("/authenticateLogin", authenticateUser);


export default router;