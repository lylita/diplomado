import { Router } from 'express';
import validate  from '../validator/validate.js';
import { createUserSchema } from '../validator/user.validate.js';
import userController from '../controllers/user.controller.js';
import { authenticateToken } from '../middlewares/authenticate.js';

const router =  Router();



//routes
router
    .route('/')
    .get(userController.getUsers)
    .post(validate(createUserSchema,'body'),userController.createUser);   

router
    .route('/:id')
    .get(authenticateToken,userController.getUser)
    .put(authenticateToken,userController.updateUser)
    .delete(authenticateToken,userController.deleteUser)
    .patch(authenticateToken,userController.activateInactivate);
router .get('/:id/tasks', authenticateToken, userController.getTasks);

export default router