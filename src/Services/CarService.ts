import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarModel from '../Models/CarModel';

class CarService {
  private model: CarModel;

  constructor() {
    this.model = new CarModel();
  }

  private createCarDomain(newCar: ICar | null): Car | null {
    if (newCar) {
      return new Car(newCar);
    }
    return null;
  }

  public async createCar(car: ICar): Promise<Car | null> {    
    const newCar = await this.model.createCar(car);

    return this.createCarDomain(newCar);
  }

  public async findAllCars(): Promise<(Car | null)[]> {
    const allCars = await this.model.findAllCars();

    const createdCars = allCars.map((car: ICar) => this.createCarDomain(car));
    
    return createdCars;
  }

  public async findCarById(id: string): Promise<Car | null> {
    const carFound = await this.model.findCarById(id);

    return this.createCarDomain(carFound);
  }

  public async updateCar(id: string, car: ICar): Promise<Car | null> {
    const updatedCar = await this.model.updateCar(id, car);
    
    return this.createCarDomain(updatedCar);
  }
}

export default CarService;