import {checkLoginCredentials, createUser, retrieveUserDetails, verifyUser} from "../services/mySql.js";
import { validateEmail, validateFullName } from "../services/validate.js";
import { hashPassword } from "../services/cryptography.js";
import { JWT_SECRET_KEY } from "../config/config.js";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
    const {username, password} = req.body;
    if (!username) return res.status(400).send({message: "Username must not be empty"})
    
    if (!password) return res.status(400).send({message: "Password must not be empty"});
    
    checkLoginCredentials(username, password)
    .then((isMatch) => {
        if (isMatch){
            retrieveUserDetails(username).then((user) => {
                const token = jwt.sign(user[0], JWT_SECRET_KEY);
                return res.status(200).send({token});
            })
            .catch(error => {
                return res.status(500).send({message: error.message});
            });
        }
        else{
            return res.status(403).send({message: "Username or password is invalid"});
        }
    })
    .catch((error) => {
        return res.status(500).send({message: error.message})
    });
};

export const authenticateSignup = (req, res, next) => {
    const {firstName, lastName, email, username, password} = req.body;
    
    if(!validateFullName(firstName, lastName)) return res.status(403).send({message: "Invalid first or last name"});
    
    if(!validateEmail(email)) return res.status(403).send({message: "Invalid email address"});
    
    hashPassword(password)
    .then(hashedPassword => {
        const newUser = new User(username, firstName, lastName, email, hashedPassword);
        createUser(newUser)
        .then( results => res.status(200).json(newUser))
        .catch( error => {
            throw new Error(error.message);
        });
    })
    .catch(error => res.status(500).send({message: error.message}));
}

export const authenticateToken = (req, res, next) => {
    const {token} = req.body;

    const decodedToken = jwt.verify(token, JWT_SECRET_KEY);


    if (!decodedToken){
        return res.status(401).send({message: "Unauthorized: Invalid Token"});
    }

    verifyUser(decodedToken.id, decodedToken.username, decodedToken.email).then((user) => {
        if(user.length > 0){
            return res.status(200).send({token})
        }
        return res.status(401).send({message: "Unauthorized: User not found"});
    })
    .catch(error => {
        return res.status(500).send({message: error.message});
    });    

}
