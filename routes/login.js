// fired on login routes

import express from "express";
import {loginUser, checkUserLoggedIn} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/login/token", checkUserLoggedIn);

export default router;