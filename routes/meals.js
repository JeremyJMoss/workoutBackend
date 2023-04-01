// fired on meals routes

import express from "express";
import { createMeal, getMealList, getMealsBySearchQuery, getMealById } from "../controllers/mealController.js";

const router = express.Router();

router.get("/meals/meallist", getMealList);
router.post("/meals/filteredmeals", getMealsBySearchQuery);
router.post("/admin/meals/createmeal", createMeal);
router.post("/meals/getmealbyid", getMealById);

export default router;