import { User } from '../models/users.js';   
import { comparar } from "../common/bcrypt.js";
import jwt from 'jsonwebtoken';
import config from '../config/env.js';
async function login(req,res, next) {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({
            where: { username }
        });
        if (!user) {
            return res.status(403).json({ message: 'User not Autorizado' });
        }

        const isMatch = await comparar(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ message: 'user not found' });
        }
        const token = jwt.sign({userId: user.id}, config.JWT_SECRET, {expiresIn: eval(config.JWT_EXPIRES_SECONDS)});
        res.json({token});

    }
    catch (error) {
        //console.log(error);
        //res.status(500).json({ message: 'Internal server error' });
        next(error);
    }   
    
}

export default { login };