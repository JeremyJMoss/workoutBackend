/**
 * @class Database
 * @classdesc This is the interface for database connections. Only to be inherited from.
 * 
 * @params {Object} config - the config options for connecting to a database.
 */

class Database{
    constructor(config){
        this.config = config;
        this.connection = null;
    }

    connect(){
        // connect using this.config
    }

    close(){
        // close the connection
    }
};

export default Database;