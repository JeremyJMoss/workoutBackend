import { retrieveMealTypes, createNewMeal } from "../services/mySql.js";
import { authenticateUserToken } from "../services/authentication.js";
import { checkMealData } from "../services/validate.js";
import { kilojoulesToCalories } from "../services/validate.js";
import Serving from "../models/Serving.js";

export const getMealTypes = (req, res, next) => {
    retrieveMealTypes()
    .then(results => res.status(200).json({mealTypes: results}))
    .catch(error => res.status(500).send({message: error.message}));
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