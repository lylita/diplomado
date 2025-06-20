import { Router } from 'express';
const router =  Router();

import taskController from '../controllers/task.controller.js';

//routes
router
    .route('/')
    .get(taskController.getTasks)
    .post(taskController.createTask);
router
    .route('/:id')
    .get(taskController.getTask)
    .put(taskController.updateTask)
    .delete(taskController.deleteTask)
    .patch(taskController.taskDone);

export default router