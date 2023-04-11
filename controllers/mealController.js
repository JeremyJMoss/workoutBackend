import { createNewMeal, retrieveMealList, retrieveMealById, retrieveMealListBySearch, createNewMealEntry } from "../services/databaseQuery.js";
import { checkMealData, checkMealEntry } from "../services/validate.js";
import { kilojoulesToCalories } from "../helper/helper.js";
import Serving from "../models/Serving.js";

export const getMealList = (req, res, next) => {
    retrieveMealList()
    .then(results => res.status(200).json({results}))
    .catch(error => res.status(500).send({message: error.message}));
}

export const getMealById = (req, res, next) => {

    const {id} = req.body;

    retrieveMealById(id)
    .then(results => res.status(200).json({meal: results}))
    .catch(error => {
        return res.status(500).send({message: error.message})
    });
}

export const getMealsBySearchQuery = (req, res, next) => {

    const {searchQuery} = req.body;

    if (typeof searchQuery !== "string"){
        return res.status(400).send({message: "Invalid Search Query"});
    }

    retrieveMealListBySearch(searchQuery)
    .then(results => res.status(200).json({results}))
    .catch(error => res.status(500).send({message: error.message})
    );

}

export const createMeal = (req, res, next) => {

    const {meal} = req.body;

    checkMealData(meal)
    .then(() => {
        if (meal.energyMeasurement === "kj"){
            meal.energy = kilojoulesToCalories(meal.energy);
        }
        const serving = new Serving(meal);
        
        createNewMeal(serving)
        .then(() => {
            return res.status(200).json(serving);
        })
        .catch((error) => {
            if (error.statusCode){
                return res.status(error.statusCode).send({message:error.message});
            }
            return res.status(500).send({message:error.message});
        })
    })
    .catch(error => {
        if (error.statusCode) {
            return res.status(error.statusCode).send({message: error.message});
        }
        return res.status(500).send({message: error.message});
    })

}

export const createMealEntry = (req, res, next) => {
    
    const decodedToken = req.token;

    const userId = decodedToken.id;

    const mealEntry = req.body;

    checkMealEntry(mealEntry)
    .then(() => {
        createNewMealEntry(mealEntry, userId)
        .then(() => {
            return res.status(200).json(mealEntry);
        })
        .catch(error => {
            if (error.statusCode){
                return res.status(error.statusCode).send({message: error.message});
            }
            return res.status(500).send({message:error.message});
        })
    })
    .catch(error => {
        return res.status(error.statusCode).send({message: error.message});
    })
}