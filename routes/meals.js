// fired on meals routes

import express from "express";
import { createMeal, getMealList, getMealsBySearchQuery, getMealById, createMealEntry } from "../controllers/mealController.js";
import { adminAuth, userAuth } from "../middleware/Authorization.js";

const router = express.Router();

router.get("/meals/meallist",  userAuth, getMealList);
router.post("/meals/filteredmeals", userAuth, getMealsBySearchQuery);
router.post("/meals/getmealbyid", userAuth, getMealById);
router.post("/meals/createmealentry", userAuth, createMealEntry);
router.post("/admin/meals/createmeal", adminAuth, createMeal);

export default router;