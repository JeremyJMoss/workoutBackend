import {mySqlConfig} from "../config/config.js";
import MySQLDatabase from "../models/MySQLDatabase.js";
import { comparePasswords } from "./cryptography.js";

const mysqlDb = new MySQLDatabase(mySqlConfig);

export const checkLoginCredentials = async (username, password) => {
    mysqlDb.connect();
    const sqlQuery = "SELECT password FROM users WHERE username=? limit 1;"
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

export const createUser = async (user) => {
    mysqlDb.connect()
    const sqlQuery = "INSERT INTO users (username, firstname, lastname, email, password) VALUES(?, ?, ?, ?, ?);"
    try{
        await mysqlDb.query(sqlQuery, 
            [
                user.username,
                user.firstName,
                user.lastName,
                user.email,
                user.encryptedPassword
            ]);
    }
    catch(err){
        throw new Error(err.message);
    }
    finally{
        mysqlDb.close();
    }
}

