import {checkLoginCredentials} from "../services/mysql";

exports.authenticateUser = (req, res, next) => {
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
            return res.status(200).json({loggedin: true});
        }
        return res.status(200).json({loggedin: false, error: "Username or password is invalid"});
    })
    .catch((err) => res.status(502).json({loggedin: false, error: `${err.message}`}));
};
