// fired on signup routes

import express from "express";
import { authenticateSignup } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", authenticateSignup);

export default router;