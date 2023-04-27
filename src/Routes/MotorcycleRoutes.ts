import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';
import ValidateId from '../Middlewares/ValidateId';

const MotorcycleRoutes = Router();

MotorcycleRoutes.post(
  '/', 
  (req, res, next) => new MotorcycleController(req, res, next).createMotorcycle(),
);
MotorcycleRoutes.get(
  '/:id',
  ValidateId,
  (req, res, next) => new MotorcycleController(req, res, next).findMotorcycleById(),
);
MotorcycleRoutes.get(
  '/', 
  (req, res, next) => new MotorcycleController(req, res, next).findAllMotorcycles(),
);
MotorcycleRoutes.put(
  '/:id',
  ValidateId,
  (req, res, next) => new MotorcycleController(req, res, next).updateMotorcycle(),
);
MotorcycleRoutes.delete(
  '/:id',
  ValidateId,
  (req, res, next) => new MotorcycleController(req, res, next).deleteMotorcycle(),
);

export default MotorcycleRoutes;