import { Router } from 'express';
import CarController from '../Controllers/CarController';
import ValidateId from '../Middlewares/ValidateId';

const CarRoutes = Router();

CarRoutes.post('/', (req, res, next) => new CarController(req, res, next).createCar());
CarRoutes.get(
  '/:id',
  ValidateId,
  (req, res, next) => new CarController(req, res, next).findCarById(),
);
CarRoutes.get('/', (req, res, next) => new CarController(req, res, next).findAllCars());
CarRoutes.put(
  '/:id',
  ValidateId,
  (req, res, next) => new CarController(req, res, next).updateCar(),
);
CarRoutes.delete(
  '/:id',
  ValidateId,
  (req, res, next) => new CarController(req, res, next).deleteCar(),
);

export default CarRoutes;