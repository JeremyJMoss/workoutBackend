import { verifyUser } from "../services/databaseQuery.js";
import { checkSignupData } from "../services/validate.js";
import { retrieveUserToken } from "../services/token.js";


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
    const decodedToken = req.token;
    const authToken = req.headers.authorization?.split(" ")[1];

    verifyUser(decodedToken.id, decodedToken.username, decodedToken.email).then((user) => {
        if(user.length > 0){
            return res.status(200).send({token: authToken});
        }
        return res.status(400).send({message: "Unauthorized: User not found"});
    })
    .catch(error => {
        return res.status(500).send({message: error.message});
    });    

}
