import { Router } from 'express';
import CarController from '../Controllers/CarController';
import ValidateId from '../Middlewares/ValidateId';

const carRoutes = Router();

carRoutes.post('/', (req, res, next) => new CarController(req, res, next).createCar());
carRoutes.get(
  '/:id',
  ValidateId,
  (req, res, next) => new CarController(req, res, next).findCarById(),
);
carRoutes.get('/', (req, res, next) => new CarController(req, res, next).findAllCars());

export default carRoutes;