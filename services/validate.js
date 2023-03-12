import { hashPassword } from "./cryptography.js";
import User from "../models/UserModel.js";
import HttpError from "../models/HttpError.js";
import { createUser } from "./mySql.js";

const validateWholeNumber = function(num){
    return /^\d+$/.test(num);
}

const validateDecimalNumber = function(num){
    return /^\d+$|^\d+\.\d+$/.test(num);
}

const validateServingSizeUnit = function(unitOfMeasure){
    return ["g", "mL"].includes(unitOfMeasure);
}

const validateEnergyUnit = function(unitOfMeasure){
    return ["cal", "kj"].includes(unitOfMeasure);
}


const validateEmail = function(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}
const validateFullName = function(firstName, lastName){
    if (firstName.trim().split(" ").length > 1){
        return false;
    }
    const fullName = `${firstName} ${lastName}`;
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(fullName);
}

export const kilojoulesToCalories = (kj) => {
    const calories = Math.ceil(kj * 0.239006);
    return calories;  
  }

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
        if (["servingSize", "energy", "sodium"].includes(index)){
            if (value !== null){
                if (!validateWholeNumber(value)) throw new HttpError(`${index} must be a whole number`, 400);
            }
        }
        if (["protein", "totalFat", "saturatedFat", "carbohydrates", "sugars"].includes(index)){
            if (value !== null){
                if (!validateDecimalNumber(value)) throw new HttpError(`${index} must be a number`, 400);
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