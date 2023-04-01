import { createNewMeal, retrieveMealList, retrieveMealById, retrieveMealListBySearch } from "../services/databaseQuery.js";
import { authenticateUserToken } from "../services/authentication.js";
import { checkMealData } from "../services/validate.js";
import { kilojoulesToCalories } from "../helper/helper.js";
import Serving from "../models/Serving.js";

export const getMealList = (req, res, next) => {
    retrieveMealList()
    .then(results => res.status(200).json({results}))
    .catch(error => res.status(500).send({message: error.message}));
}

export const getMealById = (req, res, next) => {
    const authToken = req.headers.authorization?.split(" ")[1];

    const {id} = req.body;

    const {isAuthenticated} = authenticateUserToken(authToken);

    if(!isAuthenticated){
        return res.status(401).send({message: "Unauthorized: Invalid or expired token"});
    }

    retrieveMealById(id)
    .then(results => res.status(200).json({meal: results}))
    .catch(error => {
        return res.status(500).send({message: error.message})
    });
}

export const getMealsBySearchQuery = (req, res, next) => {
    const authToken = req.headers.authorization?.split(" ")[1];

    const {searchQuery} = req.body;

    const {isAuthenticated} = authenticateUserToken(authToken);

    if (!isAuthenticated){
        return res.status(401).send({message: "Unauthorized: Invalid or expired token"});
    }

    if (typeof searchQuery !== "string"){
        return res.status(400).send({message: "Invalid Search Query"});
    }

    retrieveMealListBySearch(searchQuery)
    .then(results => res.status(200).json({results}))
    .catch(error => res.status(500).send({message: error.message})
    );

}

export const createMeal = (req, res, next) => {
    const authToken = req.headers.authorization?.split(" ")[1];
    
    const {meal} = req.body;

    const {isAdmin, isAuthenticated} = authenticateUserToken(authToken);

    if(!isAuthenticated){
        return res.status(401).send({message: "Unauthorized: Invalid or expired token"})
    }

    if (!isAdmin){
        return res.status(401).send({message: "Unauthorized: User does not have admin rights"})
    }

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