import { Schema, model, models, Model, UpdateQuery } from 'mongoose';

abstract class AbstractODM<T> {
  private schema: Schema;
  public model: Model<T>;
  protected modelName: string;

  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(modelName, this.schema);
  }

  public async createVehicle(vehicle: T): Promise<T> {
    return this.model.create({ ...vehicle });
  }

  public async findAllVehicles(): Promise<T[]> {
    return this.model.find();
  }

  public async findVehicleById(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async updateVehicle(id: string, vehicle: T): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, { ...vehicle } as UpdateQuery<T>, { new: true });
  }
}

export default AbstractODM;