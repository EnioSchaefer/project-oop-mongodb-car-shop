import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRoutes from './Routes/CarRoutes';
import MotorcycleRoutes from './Routes/MotorcycleRoutes';

const app = express();

app.use(express.json());

app.use(ErrorHandler.handle);

app.use('/cars', carRoutes);
app.use('/motorcycles', MotorcycleRoutes);

export default app;
