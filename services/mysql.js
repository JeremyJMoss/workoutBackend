import {mySQLConfig} from "../config/mysqlconfig";
import MySQLDatabase from "../models/MySQLDatabase";
import bcrypt from "bcrypt";

const mysqlDb = new MySQLDatabase(mySQLConfig);

export const checkLoginCredentials = async (username, password) => {
    mysqlDb.connect();
    const sqlQuery = "SELECT password FROM users WHERE username=? limit 1;"
    try{
        const results = await mysqlDb.query(sqlQuery, [username]);
        console.log(results);
        if (results.length < 1){
            return false;
        }
        const hashedPassword = results[0].password;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        console.log(isMatch);
        return isMatch;
    }
    catch(err){
        throw err;
    }
    finally{
        mysqlDb.close();
    }
};

