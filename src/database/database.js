import { Sequelize } from "sequelize";

import config from "../config/env.js";
export const sequelize = new Sequelize(
    config.DB_DATABASE, //database
    config.DB_USER, //user 
    config.DB_PASSWORD, //password',
    {
        host: config.DB_HOST, //host
        dialect: config.DB_DIALECT, //dialect
        logging: console.log(), // Disable logging; default: console.log
        dialectOptions: 
            config.DB_USE_SSL === 'true' 
            ? {
                ssl: {  
                    require: true, // This will help you to connect with self-signed certificates
                    rejectUnauthorized: false // This will help you to connect with self-signed certificates
                }  
            }: {}
    }   
)