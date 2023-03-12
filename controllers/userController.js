import { verifyUser } from "../services/mySql.js";
import { checkSignupData } from "../services/validate.js";
import { authenticateUserToken, retrieveUserToken } from "../services/authentication.js";


export const loginUser = (req, res, next) => {
    const {username, password} = req.body;

    retrieveUserToken(username, password)
    .then(token => res.status(200).json(token))
    .catch(error => res.status(error.statusCode).send({message: error.message}))
};

export const signupUser = (req, res, next) => {
    checkSignupData(req.body)
    .then(results => res.status(200).json(results))
    .catch(error => {
        return res.status(error.statusCode).send({message: error.message})
    })
}

export const checkUserLoggedIn = (req, res, next) => {
    const {token} = req.body;

    const {decodedToken, isAuthenticated} = authenticateUserToken(token);

    if(!isAuthenticated){
        return res.status(401).send({message: "Unauthorized: Invalid or expired token"});
    }

    verifyUser(decodedToken.id, decodedToken.username, decodedToken.email).then((user) => {
        if(user.length > 0){
            return res.status(200).send({token})
        }
        return res.status(400).send({message: "Unauthorized: User not found"});
    })
    .catch(error => {
        return res.status(500).send({message: error.message});
    });    

}
