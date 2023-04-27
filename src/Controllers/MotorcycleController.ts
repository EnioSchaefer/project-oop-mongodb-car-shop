import { Request, Response, NextFunction } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/MotorcycleService';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async createMotorcycle(): Promise<Response | void> {
    try {
      const motorcycle: IMotorcycle = this.req.body;

      const newMotorcycle = await this.service.createMotorcycle(motorcycle);

      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      return this.next(error);
    }
  }

  public async findAllMotorcycles(): Promise<Response | void> {
    try {
      const allMotorcycles = await this.service.findAllMotorcycles();

      return this.res.status(200).json(allMotorcycles);
    } catch (error) {
      return this.next(error);
    }
  }

  public async findMotorcycleById(): Promise<Response | void> {
    try {
      const { id } = this.req.params;

      const foundMotorcycle = await this.service.findMotorcycleById(id);

      if (!foundMotorcycle) return this.res.status(404).json({ message: 'Motorcycle not found' });

      return this.res.status(200).json(foundMotorcycle);
    } catch (error) {
      return this.next(error);
    }
  }

  public async updateMotorcycle(): Promise<Response | void> {
    try {
      const { id } = this.req.params;
      const motorcycle = this.req.body;

      const updatedMotorcycle = await this.service.updateMotorcycle(id, motorcycle);

      if (!updatedMotorcycle) return this.res.status(404).json({ message: 'Motorcycle not found' });

      return this.res.status(200).json(updatedMotorcycle);
    } catch (error) {
      return this.next(error);
    }
  }
}

export default MotorcycleController;