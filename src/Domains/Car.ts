import ICar from '../Interfaces/ICar';

class Car {
  protected id: number | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status: boolean | undefined;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(
    carData: ICar,
  ) {
    this.id = carData.id;
    this.model = carData.model;
    this.year = carData.year;
    this.color = carData.color;
    this.status = carData.status;
    this.buyValue = carData.buyValue;
    this.doorsQty = carData.doorsQty;
    this.seatsQty = carData.seatsQty;
  }

  protected getId(): number | undefined {
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

  private getDoorsQty(): number {
    return this.doorsQty;
  }

  private getSeatsQty(): number {
    return this.seatsQty;
  }
}

export default Car;