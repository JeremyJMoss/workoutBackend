// fired on meals routes

import express from "express";
import { getMealTypes } from "../controllers/mealController.js";

const router = express.Router();

router.get("/meals/types", getMealTypes);

export default router;