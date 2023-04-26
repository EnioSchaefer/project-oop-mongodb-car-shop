import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/CarModel';

class CarService {
  private createCarDomain(newCar: ICar | null): Car | null {
    if (newCar) {
      return new Car(newCar);
    }
    return null;
  }

  public async createCar(car: ICar): Promise<Car | null> {
    const carModel = new CarModel();
    
    const newCar = await carModel.createCar(car);

    return this.createCarDomain(newCar);
  }
}

export default CarService;