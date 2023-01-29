const bcrypt = require("bcrypt");

/**
 * @class User
 * @classdesc This class is used for creating a user object.
 * 
 * @param {string} #username - The username of the user.
 * @param {string} #decryptedPassword - The password the user entered.
 * @param {string} #email - the email of the user.
 * @param {string} #firstName - the first name of the user.
 * @param {string} #lastName - the last name of the user.
 */
class User{
    #username
    #decryptedPassword;
    #email;
    #firstName;
    #lastName;

    constructor(username, firstName, lastName, email, decryptedPassword){
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.#decryptedPassword = decryptedPassword;
    }

    /**
     * Encrypts a users password
     * 
     * @memberof User
     *
     * @returns {Promise<Object>} - A promise that resolves with the hashed password or rejects with an error.
     */
    async encryptPassword(){
        try{
            const salt = await bcrypt.genSalt(12);
            const hash = await bcrypt.hash(this.#decryptedPassword, salt);
            return hash;
        }
        catch(err){
          throw err;  
        } 
    }

    /**
     * Getter to retrieve the #firstName field value.
     * 
     * @returns {string} - The first name of the User.
     */
    get firstName(){
        return this.#firstName;
    }

    /**
     * Setter to make sure firstName field is not empty.
     * 
     * @param {string} firstName - The first name of the user.
     * 
     */
    set firstName(firstName){
        if(!firstName){
            throw new Error("First Name mustn't be empty");
        }
        this.#firstName = firstName;
    }

    /**
     * Getter to retrieve the #lastName field value.
     * 
     * @returns {string} - The last name of the user.
     */
    get lastName(){
        return this.#lastName;
    }

    /**
     * Setter to make sure lastName field is not empty.
     * 
     * @param {string} lastName - The last name of the user.
     * 
     */
    set lastName(lastName){
        if(!lastName){
            throw new Error("Last name mustn't be empty")
        }
        this.#lastName = lastName;
    }

    /**
     * Getter to retrieve the #email field value.
     * 
     * @returns {string} - The email of the user.
     */
    get email(){
        return this.#email;
    }

    /**
     * Setter to make sure email field is not empty.
     * 
     * @param {string} email - The email of the user.
     * 
     */
    set email(email){
        if(!email){
            throw new Error("Email mustn't be empty");
        }
        this.#email = email;
    }

    /**
     * Getter to retrieve the #username field value.
     * 
     * @returns {string} - The username of the user.
     */
    get username(){
        return this.#username;
    }
    
    /**
     * Setter to make sure username field is not empty.
     * 
     * @param {string} username - The username of the user.
     * 
     */
    set username(username){
        if(!username){
            throw new Error("Username mustn't be empty");
        }
        this.#username = username
    }
}

module.exports = User;