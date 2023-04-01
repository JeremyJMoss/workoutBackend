// fired on login routes

import express from "express";
import {loginUser, checkUserLoggedIn} from "../controllers/userController.js";
import { userAuth } from "../middleware/Authorization.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/login/token", userAuth, checkUserLoggedIn);

export default router;