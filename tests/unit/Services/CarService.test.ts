import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Car from '../../../src/Domains/Car';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Tests Car service layer', function () {
  const mainCarName = 'Marea';
  const secondaryCarName = 'Tempra';

  const carIdInput = '6348513f34c397abcad040b2';

  const inputCar: ICar = {
    model: mainCarName,
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  };

  const outputCar: ICar = {
    id: '6348513f34c397abcad040b2',
    model: mainCarName,
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  };

  const outputDomainCar: Car = new Car({
    id: '6348513f34c397abcad040b2',
    model: mainCarName,
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.990,
    doorsQty: 4,
    seatsQty: 5,
  });

  const carOutputArray: ICar[] = [
    {
      id: '634852326b35b59438fbea2f',
      model: mainCarName,
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.99,
      doorsQty: 4,
      seatsQty: 5,
    },
    {
      id: '634852326b35b59438fbea31',
      model: secondaryCarName,
      year: 1995,
      color: 'Black',
      buyValue: 39,
      doorsQty: 2,
      seatsQty: 5,
    },
  ];

  afterEach(function () { return sinon.restore(); });

  it('Should create a new car and return a car domain', async function () {
    sinon.stub(Model, 'create').resolves(outputCar);
    const service = new CarService();
    const response = await service.createCar(inputCar);

    expect(response).to.deep.equal(outputDomainCar);
  });

  it('Should find all cars and return an array of car domains', async function () {
    const findAllDomains: Car[] = carOutputArray.map((car: ICar) => new Car(car));

    sinon.stub(Model, 'find').resolves(carOutputArray);
    const service = new CarService();
    const response = await service.findAllCars();

    expect(response).to.deep.equal(findAllDomains);
  });

  it('Should find a car and return a car domain', async function () {
    sinon.stub(Model, 'findById').resolves(outputCar);
    const service = new CarService();
    const response = await service.findCarById(carIdInput);

    expect(response).to.deep.equal(outputDomainCar);
  });

  it('Should update a car and return a car domain', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(outputCar);
    const service = new CarService();
    const response = await service.updateCar(carIdInput, outputCar);

    expect(response).to.deep.equal(outputDomainCar);
  });
  it('Should delete a car and return null', async function () {
    const deleteOutput = { deletedCount: 1, acknowledged: true };

    sinon.stub(Model, 'deleteOne').resolves(deleteOutput);
    const service = new CarService();
    const response = await service.deleteCar(carIdInput);

    expect(response).to.equal(1);
  });

  it('Should return null when creating a car domain missing data', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const service = new CarService();
    const response = await service.findCarById(carIdInput);

    expect(response).to.equal(null);
  });
});