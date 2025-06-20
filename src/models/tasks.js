import { DataTypes } from 'sequelize';
import {sequelize} from '../database/database.js';
import { toDefaultValue } from 'sequelize/lib/utils';
export const Task = sequelize.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'Name is required'
            },
            notEmpty: {
                msg: 'Name cannot be empty'
            }
        }
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
});