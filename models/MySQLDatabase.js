import mysql from "mysql2";
import Database from "./Database.js";

/**
 * 
 * @class MySQLDatabase
 * @classdesc This class is used for connecting to MySql databases and performing queries
 * 
 * @param {Object} config - The options for connecting to the MySQL server.
 * @param {string} options.host - The hostname of the mySQL server.
 * @param {string} options.user - The username to connect to the MySQL server.
 * @param {string} options.password - The password to connect to the MySQL server.
 * @param {string} options.database - The name of the database to connect to.
 */

class MySQLDatabase extends Database{
    constructor(config){
        super(config);
    }

    /**
     * Connects to the MySQL server.
     * 
     * @memberof MySQLDatabase
     */
    connect(){
        this.connection = mysql.createConnection(this.config);
        this.connection.connect((err) => {
            if (err){
                throw err;
            }
        })
    }

    /**
     * Closes the connection to the MySQL server.
     * 
     * @memberof MySQLDatabase
     */
    close(){
        this.connection.end();
    }

    /**
     * 
     * @memberof MySQLDatabase
     * @param {string} sql - The sql query to execute. 
     * @param {Object} values - The values for the placeholders in the query. If there are none will default to empty array. 
     * @returns {Promise<Object>} - A promise that resolves to the results or rejects due to an error.
     */
    query(sql, values = []){
        return new Promise((resolve, reject) => {
            if (values){
                this.connection.query(sql, values, (err, results) => {
                    if (err){
                        return reject(err);
                    }
                    return resolve(results);
                });
            }
            this.connection.query(sql, (err, results) => {
                if (err){
                    return reject(err);
                }
                resolve(results);
            });
            
        });
    }
}

export default MySQLDatabase;