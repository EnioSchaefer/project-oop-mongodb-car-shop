import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Tests Car service layer', function () {
  afterEach(function () { return sinon.restore(); });

  it('Should create a new car and return a car domain', async function () {
    const createInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const createOutput: Car = new Car({
      id: '6348513f34c397abcad040b2',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });

    sinon.stub(Model, 'create').resolves(createOutput);
    const service = new CarService();
    const response = await service.createCar(createInput);

    expect(response).to.deep.equal(createOutput);
  });

  it('Should find all cars and return an array of car domains', async function () {
    const findAllOutput: ICar[] = [
      {
        id: '634852326b35b59438fbea2f',
        model: 'Marea',
        year: 2002,
        color: 'Black',
        status: true,
        buyValue: 15.99,
        doorsQty: 4,
        seatsQty: 5,
      },
      {
        id: '634852326b35b59438fbea31',
        model: 'Tempra',
        year: 1995,
        color: 'Black',
        buyValue: 39,
        doorsQty: 2,
        seatsQty: 5,
      },
    ];
    const findAllDomains: Car[] = findAllOutput.map((car: ICar) => new Car(car));

    sinon.stub(Model, 'find').resolves(findAllOutput);
    const service = new CarService();
    const response = await service.findAllCars();

    expect(response).to.deep.equal(findAllDomains);
  });

  it('Should find a car and return a car domain', async function () {
    const findInput = '634852326b35b59438fbea2f';
    const findOutput: ICar = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carDomain: Car = new Car({
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });

    sinon.stub(Model, 'findById').resolves(findOutput);
    const service = new CarService();
    const response = await service.findCarById(findInput);

    expect(response).to.deep.equal(carDomain);
  });

  it('Should update a car and return a car domain', async function () {
    const updateInputId = '634852326b35b59438fbea2f';
    const updateOutputCar: ICar = {
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carDomain: Car = new Car({
      id: '634852326b35b59438fbea2f',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });

    sinon.stub(Model, 'findByIdAndUpdate').resolves(updateOutputCar);
    const service = new CarService();
    const response = await service.updateCar(updateInputId, updateOutputCar);

    expect(response).to.deep.equal(carDomain);
  });

  it('Should delete a car and return null', async function () {
    const deleteInputId = '634852326b35b59438fbea2f';
    const deleteOutput = { deletedCount: 1, acknowledged: true };

    sinon.stub(Model, 'deleteOne').resolves(deleteOutput);
    const service = new CarService();
    const response = await service.deleteCar(deleteInputId);

    expect(response).to.equal(1);
  });

  it('Should return null when creating a car domain missing data', async function () {
    const findInput = '634852326b35b59438fbea2f';

    sinon.stub(Model, 'findById').resolves(null);

    const service = new CarService();
    const response = await service.findCarById(findInput);

    expect(response).to.equal(null);
  });
});