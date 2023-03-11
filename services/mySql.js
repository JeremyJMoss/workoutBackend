import {mySqlConfig} from "../config/config.js";
import MySQLDatabase from "../models/MySQLDatabase.js";
import { comparePasswords } from "./cryptography.js";

const mysqlDb = new MySQLDatabase(mySqlConfig);

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
    const sqlQuery = "INSERT INTO users (username, firstname, lastname, email, password, isAdmin) VALUES(?, ?, ?, ?, ?, ?);"
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