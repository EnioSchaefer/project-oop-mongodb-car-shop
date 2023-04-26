import { Request, Response, NextFunction } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async createCar(): Promise<Response | void> {
    try {
      const car: ICar = this.req.body;

      const newCar = await this.service.createCar(car);

      return this.res.status(201).json(newCar);
    } catch (error) {
      return this.next(error);
    }
  }
}

export default CarController;