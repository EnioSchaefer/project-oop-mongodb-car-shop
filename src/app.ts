import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRoutes from './Routes/CarRoutes';

const app = express();

app.use(express.json());

app.use(ErrorHandler.handle);

app.use('/cars', carRoutes);

export default app;
