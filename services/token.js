import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config.js";
import HttpError from "../models/HttpError.js";
import { checkLoginCredentials, retrieveUserDetails } from "./databaseQuery.js";

export const retrieveUserToken = async (username, password) => {
    if (!username) throw new HttpError("Username must not be empty", 400);

    if (!password) throw new HttpError("Password must not be empty", 400);
    
    try{
        const isMatch = await checkLoginCredentials(username, password)
        
        if (isMatch){
            const user = await retrieveUserDetails(username);
            const nextMonth = new Date();
            nextMonth.setDate(nextMonth.getDate() + 30);
            user[0].exp = +nextMonth;
            const token = jwt.sign(user[0], JWT_SECRET_KEY);
            return {token};
        }
        else{
            throw new HttpError("Username or password is invalid", 401);
        }
    }
    catch(error){
        if (!error.statusCode){
            throw new HttpError(error.message, 500);
        }
        throw new HttpError(error.message, error.statusCode);
    }
}
