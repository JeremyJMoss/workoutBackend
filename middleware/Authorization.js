import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config.js";

const authenticateUserToken = (authToken) => {

    if (!authToken) return userAuthObject;

    const userAuthObject = {isAdmin: false, isAuthenticated: false, decodedToken: null};

    const decodedToken = jwt.verify(authToken, JWT_SECRET_KEY);

    if(!decodedToken) return userAuthObject;

    userAuthObject.decodedToken = decodedToken;

    const expiry = new Date(decodedToken.exp)
    const today = new Date();

    if (today >= expiry) return userAuthObject;

    userAuthObject.isAuthenticated = true;
    userAuthObject.isAdmin = decodedToken.isAdmin;

    return userAuthObject;
}

export const userAuth = (req, res, next) => {
    
    const authToken = req.headers.authorization?.split(" ")[1];

    const {isAuthenticated, decodedToken} = authenticateUserToken(authToken);
    
    if(!isAuthenticated){
        return res.status(401).send({message: "Unauthorized: Invalid or expired token"});
    }

    req.token = decodedToken;

    next();
}

export const adminAuth = (req, res, next) => {
    const authToken = req.headers.authorization?.split(" ")[1];

    const {isAuthenticated, isAdmin, decodedToken} = authenticateUserToken(authToken);
    
    if(!isAuthenticated){
        return res.status(401).send({message: "Unauthorized: Invalid or expired token"});
    }

    if (!isAdmin){
        return res.status(401).send({message: "Unauthorized: User does not have admin rights"})
    }

    req.token = decodedToken;

    next();
}