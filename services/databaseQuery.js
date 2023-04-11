import {mySqlConfig} from "../config/config.js";
import HttpError from "../models/HttpError.js";
import MySQLDatabase from "../models/MySQLDatabase.js";
import { comparePasswords } from "./cryptography.js";

const mysqlDb = new MySQLDatabase(mySqlConfig);

// User calls

export const checkLoginCredentials = async (username, password) => {
    mysqlDb.connect();
    const sqlQuery = "SELECT password FROM users WHERE username=? LIMIT 1;"
    try{
        const results = await mysqlDb.query(sqlQuery, [username]);
        
        if (results.length < 1){
            return false;
        }
        
        const hashedPassword = results[0].password;
        const isMatch = comparePasswords(password, hashedPassword);
        return isMatch;
    }
    catch(err){
        throw new Error(err.message);
    }
    finally{
        mysqlDb.close();
    }
};

export const retrieveUserDetails = async (username) => {
    mysqlDb.connect();
    const sqlQuery = "SELECT id, username, firstname, lastname, email, isAdmin FROM users WHERE username=? LIMIT 1;";
    try{
        const user = await mysqlDb.query(sqlQuery, [username]);
        return user;
    }
    catch(error){
        throw new Error(error.message);
    }
    finally{
        mysqlDb.close();
    }
}

export const verifyUser = async (userId, username, email) => {
    mysqlDb.connect();
    const sqlQuery = "SELECT * FROM users WHERE id = ? AND username = ? AND email = ? LIMIT 1;";
    try{
        const user = await mysqlDb.query(sqlQuery, [userId, username, email]);
        return user;
    }
    catch(error){
        throw new Error(error.message);
    }
    finally{
        mysqlDb.close();
    }
}

export const createUser = async (user) => {
    mysqlDb.connect()
    const sqlQuery = "INSERT INTO users (username, firstname, lastname, email, password, isAdmin) VALUES(?, ?, ?, ?, ?, ?);";
    try{
        const result = await mysqlDb.query(sqlQuery, 
            [
                user.username,
                user.firstName,
                user.lastName,
                user.email,
                user.encryptedPassword,
                user.isAdmin
            ]);
        if (result.affectedRows < 1){
            throw new Error("User failed to be added");
        }
        return user;
    }
    catch(err){
        throw new Error(err.message);
    }
    finally{
        mysqlDb.close();
    }
}

// Meal Calls

export const checkServingExists = async (foodId, servingName) => {
    mysqlDb.connect();
    const sqlQuery = "SELECT * FROM servingSizes WHERE foodId = ? AND name = ?;";
    try{
        const results = await mysqlDb.query(sqlQuery, [foodId, servingName]);
        return results;
    }
    catch(error){
        throw new HttpError(error.message, 500);
    }
    finally{
        mysqlDb.close();
    }
}

export const retrieveMealList = async () => {
    mysqlDb.connect();
    const sqlQuery = "SELECT * FROM food;";
    try {
        const results = await mysqlDb.query(sqlQuery);
        return results;
    }
    catch(err){
        throw new Error(err.message);
    }
    finally{
        mysqlDb.close()
    }
}

export const retrieveMealListBySearch = async (searchQuery) => {
    mysqlDb.connect();
    searchQuery = searchQuery + "%";
    const secondSearchCondition = "% " + searchQuery + "%"; 
    const sqlQuery = "SELECT id, name FROM food WHERE UPPER(name) like UPPER(?) OR name like UPPER(?);";
    try {
        const results = await mysqlDb.query(sqlQuery, [searchQuery, secondSearchCondition]);
        return results;
    }
    catch(error){
        throw new Error(error.message);
    }
    finally{
        mysqlDb.close();
    }
}

export const retrieveMealById = async (foodId) => {
    mysqlDb.connect();
    try{
        const foodInfo = await retrieveFoodInfoById(foodId);
        const servings = await retrieveServingsById(foodId);
        return {...foodInfo[0], servings};
    }
    catch(error){
        throw new HttpError(error.sqlMessage);
    }
    finally{
        mysqlDb.close();
    }
}

const retrieveFoodInfoById = async (foodId) => {
    const sqlQuery = 'SELECT energy, protein, totalFat, saturatedFat, carbohydrates, sugars, sodium, unitOfMeasurement FROM foodInfo WHERE foodId = ?;';
    try{
        const results = await mysqlDb.query(sqlQuery, foodId);
        return results;
    }
    catch(error){
        throw new Error(error.message);
    }
}

const retrieveServingsById = async (foodId) => {
    const sqlQuery = "SELECT servingSize, name FROM servingSizes where foodId = ?;";
    try{
        const results = await mysqlDb.query(sqlQuery, foodId);
        return results;
    }
    catch(error){
        throw new Error(error.message);
    }
}

const createNewFood = async(foodName) => {
    const sqlQuery = "INSERT INTO food (name) VALUES (?);";
    try{
        const results = await mysqlDb.query(sqlQuery, foodName);
        return results;
    }
    catch(error){
        throw new HttpError("Could not insert into food table", 500)
    }
}

const createNewServing = async (foodId, name = "Single", servingSize = 1) => {
    const sqlQuery = "INSERT INTO servingSizes (foodId, name, servingSize) VALUES (?, ?, ?);";
    try{
        const params = [foodId, name, servingSize];
    
        const results = await mysqlDb.query(
            sqlQuery,
            params
        )
        return results;
    }
    catch(error){
        throw new HttpError("Could not insert into serving sizes table", 500);
    }
}

// create an entry in the datatbase for either 1g or 1ml serving
const createNewFoodInfoEntry = async (foodId, newMeal) => {
    const sqlQuery = "INSERT INTO foodInfo (energy, protein, totalFat, saturatedFat, carbohydrates, sugars, sodium, unitOfMeasurement, foodId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"
    try{
        const results = await mysqlDb.query(
            sqlQuery, 
            [newMeal.energy, 
            newMeal.protein, 
            newMeal.totalFat, 
            newMeal.saturatedFat, 
            newMeal.carbohydrates, 
            newMeal.sugars, 
            newMeal.sodium,
            newMeal.unitOfMeasurement,
            foodId]);
        return results;
    }
    catch(error){
        throw new HttpError("Could not insert into food info table", 500);
    }
}

export const createNewMeal = async(newMeal) => {
    mysqlDb.connect();
    try{
        const foodTableResults = await createNewFood(newMeal.name);
        if (foodTableResults.affectedRows < 1){
            throw new HttpError("No record inserted into food table", 500);
        }
        const foodId = foodTableResults.insertId
        const servingsRecommendedResult = await createNewServing(foodId, "Serving", newMeal.recommendedServingSize);
        if (servingsRecommendedResult.affectedRows < 1){
            throw new HttpError("Serving record not inserted into serving sizes table", 500);
        }
        const servingsSingleResult = await createNewServing(foodId);
        if (servingsSingleResult.affectedRows < 1){
            throw new HttpError("Single serving record not inserted into serving sizes table", 500);
        }
        const foodInfoTableResults = await createNewFoodInfoEntry(foodId, newMeal);
        if (foodInfoTableResults.affectedRows < 1){
            throw new HttpError("No record inserted into food info table", 500);
        }
    }
    catch(error){
        if (error.statusCode){
            throw new HttpError(error.message, error.statusCode)
        }
        throw new HttpError("Something Went Wrong", 500)
    }
    finally{
        mysqlDb.close()
    }
}

export const createNewMealEntry = async (mealEntry, userId) => {
    mysqlDb.connect();
    const sqlQuery = "INSERT INTO foodConsumed (userId, dateEaten, mealType, foodId, servingName, quantity) VALUES(?, ?, ?, ?, ?, ?);";
    try{
        const results = await mysqlDb.query(sqlQuery, [userId, mealEntry.dateEaten.split("T")[0], mealEntry.mealType, mealEntry.foodId, mealEntry.servingName, mealEntry.quantity]);
        if (results.affectedRows < 1){
            throw new HttpError("Meal entry record not inserted into table", 500);
        }
    }
    catch(error){
        console.log(error);
        if (error.statusCode){
            throw new HttpError(error.message, error.statusCode)
        }
        if (error.sqlMessage){
            throw new HttpError(error.sqlMessage, 500);
        }
        throw new HttpError("Something Went Wrong", 500);
    }
    finally{
        mysqlDb.close();
    }
}