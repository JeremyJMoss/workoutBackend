import { hashPassword } from "./cryptography.js";
import User from "../models/User.js";
import HttpError from "../models/HttpError.js";
import { checkServingExists, createUser } from "./databaseQuery.js";
import { validateDecimalNumber, validateEmail, validateEnergyUnit, validateFullName, validateServingSizeUnit, validateWholeNumber } from "../helper/helper.js";

const mealTypes = [
    "Breakfast", 
    "Lunch", 
    "Dinner", 
    "Snacks", 
    "Drinks"
];

export const checkSignupData = async (requestData) => {
    const {firstName, lastName, email, username, password} = requestData;
    
    let isAdmin;

    "isAdmin" in requestData ? {isAdmin} = requestData : isAdmin = null;

    if(!validateFullName(firstName, lastName)) throw new HttpError("Invalid first or last name", 400);
    
    if(!validateEmail(email)) throw new HttpError("Invalid email address", 400);
    
    try{
        const hashedPassword = await hashPassword(password);

        const newUser = new User(username, firstName, lastName, email, hashedPassword, isAdmin);
        
        const results = await createUser(newUser)

        return results;
    }
    catch(error){
        throw new HttpError(error.message, 500);
    }
    
}

export const checkMealData = async (mealData) => {
    Object.entries(mealData)
    .forEach(([index, value]) => {
        if (index == "name" && value.trim() == ""){
            throw new HttpError("Name must not be empty", 400);
        }
        if (["servingSize", "sodium"].includes(index)){
            if (value !== null){
                if (!validateWholeNumber(value)) throw new HttpError(`${index[0].toUpperCase()}${index.slice(1)} must be a whole number`, 400);
            }
        }
        if (["protein", "totalFat", "energy", "saturatedFat", "carbohydrates", "sugars"].includes(index)){
            if (value !== null){
                if (!validateDecimalNumber(value)) throw new HttpError(`${index[0].toUpperCase()}${index.slice(1)} must be a number`, 400);
            }
        }
        if (index == "unitOfMeasurement"){
            if (!validateServingSizeUnit(value)) throw new HttpError("Invalid service size unit of measure", 400); 
        }
        if (index == "energyMeasurement"){
            if (!validateEnergyUnit(value)) throw new HttpError("Invalid energy unit of measurement", 400);
        }
    })

    return true;
}

export const checkMealEntry = async (mealEntry) => {
    try{
        if (!mealTypes.includes(mealEntry.mealType)) throw new HttpError("Invalid meal type", 400);
        const results = await checkServingExists(mealEntry.foodId, mealEntry.servingName)
        if (results.length < 1) throw new HttpError("Invalid food or serving", 400);
    }
    catch(error){
        if (error.statusCode == 400){
            throw new HttpError(error.message, 400);
        }
        throw new HttpError(error.message, 500);
    }
}