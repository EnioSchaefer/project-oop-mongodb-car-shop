import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(
    motorcycleData: IMotorcycle,
  ) {
    super(motorcycleData);

    this.category = motorcycleData.category;
    this.engineCapacity = motorcycleData.engineCapacity;
  }

  private getCategory(): string {
    return this.category;
  }

  private getEngineCapacity(): number {
    return this.engineCapacity;
  }
}

export default Motorcycle;