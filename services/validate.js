import { hashPassword } from "./cryptography.js";
import User from "../models/UserModel.js";
import HttpError from "../models/HttpError.js";
import { createUser } from "./mySql.js";

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