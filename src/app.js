// todo lo que usa express

import express from 'express';
const app=express();
//import routes
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';
import morgan from 'morgan';
import errorHandler from './middlewares/errorHandler.js';
import notFound from './middlewares/notFound.js';
import authRoutes from './routes/auth.routes.js';
import { authenticateToken } from './middlewares/authenticate.js';

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/api/login',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/tasks',authenticateToken, taskRoutes);

app.use(notFound)
app.use(errorHandler)
export default app;