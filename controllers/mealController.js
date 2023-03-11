import { retrieveMealTypes } from "../services/mySql.js";
import { authenticateUserToken } from "../services/authentication.js";

export const getMealTypes = (req, res, next) => {
    retrieveMealTypes()
    .then(results => res.status(200).json({mealTypes: results}))
    .catch(error => res.status(500).send({message: error.message}));
}

export const createMeal = (req, res, next) => {
    const authToken = req.headers.authorization?.split(" ")[1];
    
    const {isAdmin, isAuthenticated} = authenticateUserToken(authToken);

    if(!isAuthenticated){
        return res.status(401).send({message: "Unauthorized: Invalid or expired token"})
    }

    if (!isAdmin){
        return res.status(401).send({message: "Unauthorized: User does not have admin rights"})
    }


}