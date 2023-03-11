// fired on meals routes

import express from "express";
import { getMealTypes, createMeal } from "../controllers/mealController.js";

const router = express.Router();

router.get("/meals/types", getMealTypes);
router.post("/admin/meals/createmeal", createMeal);

export default router;