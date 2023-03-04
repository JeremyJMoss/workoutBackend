import { retrieveMealTypes } from "../services/mySql.js";

export const getMealTypes = (req, res, next) => {
    retrieveMealTypes()
    .then(results => res.status(200).json({mealTypes: results}))
    .catch(error => res.status(500).send({message: error.message}));
}