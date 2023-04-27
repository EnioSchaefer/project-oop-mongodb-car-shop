import IVehicle from '../Interfaces/IVehicle';

class Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean | undefined;
  protected buyValue: number;

  constructor(
    vehicleData: IVehicle,
  ) {
    this.id = vehicleData.id;
    this.model = vehicleData.model;
    this.year = vehicleData.year;
    this.color = vehicleData.color;
    this.status = vehicleData.status;
    this.buyValue = vehicleData.buyValue;
  }

  protected getId(): string | undefined {
    return this.id;
  }

  protected getModel(): string {
    return this.model;
  }

  protected getYear(): number {
    return this.year;
  }

  protected getColor(): string {
    return this.color;
  }

  protected getStatus(): boolean | undefined {
    return this.status;
  }

  protected getBuyValue(): number {
    return this.buyValue;
  }
}

export default Vehicle;