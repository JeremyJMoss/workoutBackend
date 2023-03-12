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

export const retrieveMealTypes = async () => {
    mysqlDb.connect();
    const sqlQuery = "SELECT * FROM mealTypes;";
    try {
        const results = await mysqlDb.query(sqlQuery);
        return results;
    }
    catch(err){
        throw new Error(err.message);
    }
    finally{
        mysqlDb.close();
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

const createNewServing = async (foodId, newMeal) => {
    const sqlQuery = "INSERT INTO servings (energy, protein, totalFat, saturatedFat, carbohydrates, sugars, sodium, servingSize, unitOfMeasurement, foodId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);"
    console.log(newMeal);
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
            newMeal.servingSize, 
            newMeal.unitOfMeasurement,
            foodId]);
        return results;
    }
    catch(error){
        throw new HttpError("Could not insert into servings table", 500);
    }
}

export const createNewMeal = async(newMeal) => {
    mysqlDb.connect();
    try{
        const foodTableResults = await createNewFood(newMeal.name);
        if (foodTableResults.affectedRows < 1){
            throw new HttpError("No record inserted into food table", 500);
        }
        const servingTableResults = await createNewServing(foodTableResults.insertId, newMeal);
        if (servingTableResults.affectedRows < 1){
            throw new HttpError("No record inserted into servings table", 500)
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