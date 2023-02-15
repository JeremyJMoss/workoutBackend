import dotenv from "dotenv";
dotenv.config();

export const mySqlConfig = {
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: process.env.MY_SQL_DATABASE
};

