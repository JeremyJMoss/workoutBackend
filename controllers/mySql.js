import {checkLoginCredentials, createUser} from "../services/mySql.js";
import { validateEmail, validateFullName } from "../services/validate.js";
import { hashPassword } from "../services/cryptography.js";
import User from "../models/UserModel.js";

export const authenticateUser = (req, res, next) => {
    const {username, password} = req.body;
    if (!username){
        return res.status(400).send({message: "Username must not be empty"});
    }
    if(!password){
        return res.status(400).send({message: "Password must not be empty"});
    }
    checkLoginCredentials(username, password)
    .then((isMatch) => {
        if (isMatch){
            return res.status(200).json({token: "woooooooooo"});
        }
        return res.status(403).send({message: "Username or password is invalid"});
    })
    .catch((err) => res.status(500).send({message: `${err.message}`}));
};

export const authenticateSignup = (req, res, next) => {
    const {firstName, lastName, email, username, password} = req.body;
    if(!validateFullName(firstName, lastName)){
        return res.status(403).send({message: "Invalid first or last name"});
    }
    if(!validateEmail(email)){
        return res.status(403).send({message: "Invalid email address"});
    }
    hashPassword(password)
    .then(hashedPassword => {
        const newUser = new User(username, firstName, lastName, email, hashedPassword);
        createUser(newUser)
        .then( results => res.status(200).json(newUser))
        .catch( err => {
            throw new Error(err.message);
        });
    })
    .catch(error => {
        return res.status(500).send({message: error.message});
    });
}
