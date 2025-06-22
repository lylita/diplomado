import { User } from '../models/users.js';   
import { Task } from '../models/tasks.js';
import { Status } from '../constants/index.js';
import { encriptar } from '../common/bcrypt.js';

import { Op } from 'sequelize';


async function getUsers(req,res,next)
{
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'password','status'],
            order: [['id', 'DESC']],
            where: {
                status: Status.ACTIVE,
            },
        });
        res.json(users);
    }catch (error) {
        next(error);
    }   
}

async function createUser(req, res, next) {
    const { username, password } = req.body;
    try {
         const user = await User.create({ username, password });
        res.json(user);
    } catch (error) {
        next(error);
    }
}
async function getUser(req, res, next) {
    const { id } = req.params;  
    try {
        const user = await User.findOne({
            attributes: [ 'username','password','status'],
            where: {
                    id
            }
            }); 
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }   
        res.json(user);
    } catch (error) {
        next(error);
    }   
}
async function updateUser(req, res, next) {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        if (!username && !password) {
            return res
            .status(400)
            .json({ message: 'Username or password is required' });
        }
        const passwordEncrypted = await encriptar(password);
        const user = await User.update({
            username,
            password:passwordEncrypted
        }, {
            where: { id }
        }); 
        res.json(user);
    } catch (error) {
        next(error);
    }
}
async function deleteUser(req, res, next) {
    const { id } = req.params;
    
    try {
        await User.destroy({
            where: { id }
        });
        res.status(204).json({message: 'User deleted successfully'});
    } catch (error) {
        next(error);
    }
}   

async function activateInactivate(req, res, next) {
    const { id } = req.params;
    const { status } = req.body;
    try {
        if (!status) {
            return res.status(400).json({ message: `Status must be requered` });
        }
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }   

        if (user.status === status) {
            return res.status(409).json({ message: `User is already ${status}` });
        }
        user.status = status;
        await user.save();

        res.json(user);
    } catch (error) {
        next(error);
    }
}
async function getTasks(req,res,next) {
    const {id} = req.params;
    try { 
        const user = await User.findOne({
                include: [{
                    model: Task,
                    attributes: ['name', 'done'],
                   
                }],
                attributes: ['username'],
                where: { id }
        });      
        res.json(user);
      
    }   catch (error) {
        next(error);
    } 
}
async function getListPagination(req, res, next) {
    const {page,limit,search,orderBy,orderDir} = req.query;
    try {
        const users = await User.findAndCountAll({
            attributes: ['id', 'username', 'status'],
            where:  {
                    username: {
                       [Op.like]: `%${search}%`
                }
            },
            order:[[orderBy, orderDir]],
            limit: parseInt(limit),
            offset:(parseInt(page)-1)* parseInt(limit),
        });
        res.json({
            
            total: users.count,
            page: parseInt(page),
            pages: Math.ceil(users.count / limit),
            data: users.rows,
        });
    } catch (error) {
        next(error);
    }
}
export default{ 
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    activateInactivate,
    getTasks,
    getListPagination
}