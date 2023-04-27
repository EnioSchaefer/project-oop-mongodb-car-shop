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

  public async findAllCars(): Promise<Response | void> {
    try {
      const allCars = await this.service.findAllCars();

      return this.res.status(200).json(allCars);
    } catch (error) {
      return this.next(error);
    }
  }

  public async findCarById(): Promise<Response | void> {
    try {
      const { id } = this.req.params;

      const foundCar = await this.service.findCarById(id);
      
      if (!foundCar) return this.res.status(404).json({ message: 'Car not found' });

      return this.res.status(200).json(foundCar);
    } catch (error) {
      return this.next(error);
    }
  }

  public async updateCar(): Promise<Response | void> {
    try {
      const { id } = this.req.params;
      const car = this.req.body;

      const updatedCar = await this.service.updateCar(id, car);

      if (!updatedCar) return this.res.status(404).json({ message: 'Car not found' });

      return this.res.status(200).json(updatedCar);
    } catch (error) {
      return this.next(error);
    }
  }
}

export default CarController;