// fired on login routes

import express from "express";
import {authenticateUser, authenticateToken} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", authenticateUser);
router.post("/login/token", authenticateToken);

export default router;