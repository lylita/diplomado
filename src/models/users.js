import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Status } from "../constants/index.js";
import { Task } from "./tasks.js";
import logger from "../logs/logger.js";
import { encriptar } from "../common/bcrypt.js";
export const User = sequelize.define('user', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notNull: {
                msg: 'User name is required'
            },
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull: {
                msg: 'Password is required'
            },
        }
    },
    status:{
        type: DataTypes.STRING,
        defaultValue: Status.ACTIVE,
        validate:{
            isIn: {
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: `Status must be either ${Status.ACTIVE} or ${Status.INACTIVE}`
            }
        }
    },

});
User.hasMany(Task);
Task.belongsTo(User);
User.beforeCreate (async (user) => {
    try{
        
            user.password = await encriptar(user.password);
        }

        catch (error) {
            logger.error(error.message);
            next(error);
        }
});

/*User.beforeUpdate (async (user) => {
    try{
        
            user.password = await encriptar(user.password);
        }

        catch (error) {
            logger.error(error.message);
            next(error);
        }
});*/
