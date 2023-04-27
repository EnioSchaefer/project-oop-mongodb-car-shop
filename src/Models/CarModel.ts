import { Schema, model, models, Model } from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarModel {
  private schema: Schema;
  public model: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    }, { versionKey: false });
    this.model = models.Car || model('Car', this.schema); 
  }

  public async createCar(car: ICar): Promise<ICar> {
    return this.model.create({ ...car });
  }

  public async findAllCars(): Promise<ICar[]> {
    return this.model.find();
  }

  public async findCarById(id: string): Promise<ICar | null> {
    return this.model.findById(id);
  }
}

export default CarModel;