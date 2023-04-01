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
    #username;
    #encryptedPassword;
    #email;
    #firstName;
    #lastName;
    #isAdmin;

    constructor(username, firstName, lastName, email, encryptedPassword, isAdmin){
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.encryptedPassword = encryptedPassword;
        this.isAdmin = isAdmin
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
            throw new Error("First Name must not be empty");
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
            throw new Error("Last name must not be empty")
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
            throw new Error("Email must not be empty");
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
            throw new Error("Username must not be empty");
        }
        this.#username = username
    }

    /**
     * Getter to retrieve the #encryptedPassword field value.
     * 
     * @returns {string} - The encrypted password of the user.
     */
    get encryptedPassword(){
        return this.#encryptedPassword;
    }
    
    /**
     * Setter to make sure encrypted password field is not empty.
     * 
     * @param {string} encryptedPassword - The encrypted password of the user.
     * 
     */
    set encryptedPassword(encryptedPassword){
        if(!encryptedPassword){
            throw new Error("Password must not be empty");
        }
        this.#encryptedPassword = encryptedPassword;
    }

        /**
     * Getter to retrieve the #isAdmin field value.
     * 
     * @returns {boolean} - Whether user has admin rights.
     */
        get isAdmin(){
            return this.#isAdmin;
        }
        
    /**
     * Setter to make sure isAdmin field is not empty or null.
     * 
     * @param {string} isAdmin - Whether user is admin or not.
     * 
     */
    set isAdmin(isAdmin){
        this.#isAdmin =  isAdmin ?? false;
    }
}

export default User;