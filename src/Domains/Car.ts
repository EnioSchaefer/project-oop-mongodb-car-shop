import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(
    carData: ICar,
  ) {
    super(carData);

    this.doorsQty = carData.doorsQty;
    this.seatsQty = carData.seatsQty;
  }

  private getDoorsQty(): number {
    return this.doorsQty;
  }

  private getSeatsQty(): number {
    return this.seatsQty;
  }
}

export default Car;