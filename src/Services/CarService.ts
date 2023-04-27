import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private model: CarODM;

  constructor() {
    this.model = new CarODM();
  }

  private createCarDomain(newCar: ICar | null): Car | null {
    if (newCar) {
      return new Car(newCar);
    }
    return null;
  }

  public async createCar(car: ICar): Promise<Car | null> {    
    const newCar = await this.model.createVehicle(car);

    return this.createCarDomain(newCar);
  }

  public async findAllCars(): Promise<(Car | null)[]> {
    const allCars = await this.model.findAllVehicles();

    const createdCars = allCars.map((car: ICar) => this.createCarDomain(car));
    
    return createdCars;
  }

  public async findCarById(id: string): Promise<Car | null> {
    const carFound = await this.model.findVehicleById(id);

    return this.createCarDomain(carFound);
  }

  public async updateCar(id: string, car: ICar): Promise<Car | null> {
    const updatedCar = await this.model.updateVehicle(id, car);
    
    return this.createCarDomain(updatedCar);
  }

  public async deleteCar(id: string): Promise<number | null> {
    const deletedCar = await this.model.deleteVehicle(id);

    return deletedCar;
  }
}

export default CarService;