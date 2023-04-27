import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private model: MotorcycleODM;

  constructor() {
    this.model = new MotorcycleODM();
  }

  private createMotorcycleDomain(newMotorcycle: IMotorcycle | null): Motorcycle | null {
    if (newMotorcycle) {
      return new Motorcycle(newMotorcycle);
    }
    return null;
  }

  public async createMotorcycle(motorcycle: IMotorcycle): Promise<Motorcycle | null> {
    const newMotorcycle = await this.model.createVehicle(motorcycle);

    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async findAllMotorcycles(): Promise<(Motorcycle | null)[]> {
    const allMotorcycles = await this.model.findAllVehicles();

    const createdMotorcycles = allMotorcycles
      .map((car: IMotorcycle) => this.createMotorcycleDomain(car));

    return createdMotorcycles;
  }

  public async findMotorcycleById(id: string): Promise<Motorcycle | null> {
    const motorcycleFound = await this.model.findVehicleById(id);

    return this.createMotorcycleDomain(motorcycleFound);
  }

  public async updateMotorcycle(id: string, motorcycle: IMotorcycle): Promise<Motorcycle | null> {
    const updatedMotorcycle = await this.model.updateVehicle(id, motorcycle);

    return this.createMotorcycleDomain(updatedMotorcycle);
  }

  public async deleteMotorcycle(id: string): Promise<number | null> {
    const deletedMotorcycle = await this.model.deleteVehicle(id);

    return deletedMotorcycle;
  }
}

export default MotorcycleService;