import { Sequelize } from "sequelize";

import config from "../config/env.js";
const Op = Sequelize.Op;
export const sequelize = new Sequelize(
    config.DB_DATABASE, //database
    config.DB_USER, //user 
    config.DB_PASSWORD, //password',
    {
        host: config.DB_HOST, //host
        dialect: config.DB_DIALECT, //dialect
        logging: console.log(), // Disable logging; default: console.log
        Op:Op
    }   
)