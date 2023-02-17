import {checkLoginCredentials} from "../services/mySql.js";

export const authenticateUser = (req, res, next) => {
    const {username, password} = req.body;
    if (!username){
        return res.status(400).json({error: "Username must not be empty"});
    }
    if(!password){
        return res.status(400).json({error: "Password must not be empty"});
    }
    checkLoginCredentials(username, password)
    .then((isMatch) => {
        if (isMatch){
            return res.status(200).json({loggedIn: true});
        }
        return res.status(200).json({loggedIn: false, error: "Username or password is invalid"});
    })
    .catch((err) => res.status(502).json({loggedIn: false, error: `${err.message}`}));
};
