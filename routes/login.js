// fired on login routes

import express from "express";
import {authenticateUser} from "../controllers/mySql.js";

const router = express.Router();

router.post("/login", authenticateUser);

export default router;