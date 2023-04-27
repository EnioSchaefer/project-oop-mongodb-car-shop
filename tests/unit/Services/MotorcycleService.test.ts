import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Tests Motorcycle service layer', function () {
  const mainMotorcycleName = 'Honda Cb 600f Hornet';
  const secondaryMotorcycleName = 'Honda Cbr 1000rr';

  const motorcycleIdInput = '6348513f34c397abcad040b2';

  const inputMotorcycle: IMotorcycle = {
    model: mainMotorcycleName,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  };

  const outputMotorcycle: IMotorcycle = {
    id: '6348513f34c397abcad040b2',
    model: mainMotorcycleName,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  };

  const outputDomainMotorcycle: Motorcycle = new Motorcycle({
    id: '6348513f34c397abcad040b2',
    model: mainMotorcycleName,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  });

  const motorcycleOutputArray: IMotorcycle[] = [
    {
      id: '6348513f34c397abcad040b2',
      model: mainMotorcycleName,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    },
    {
      id: '634852326b35b59438fbea31',
      model: secondaryMotorcycleName,
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    },
  ];

  afterEach(function () { return sinon.restore(); });

  it('Should create a new motorcycle and return a motorcycle domain', async function () {
    sinon.stub(Model, 'create').resolves(outputMotorcycle);
    const service = new MotorcycleService();
    const response = await service.createMotorcycle(inputMotorcycle);

    expect(response).to.deep.equal(outputDomainMotorcycle);
  });

  it('Should find all motorcycles and return an array of motorcycle domains', async function () {
    const findAllDomains: Motorcycle[] = motorcycleOutputArray
      .map((motorcycle: IMotorcycle) => new Motorcycle(motorcycle));

    sinon.stub(Model, 'find').resolves(motorcycleOutputArray);
    const service = new MotorcycleService();
    const response = await service.findAllMotorcycles();

    expect(response).to.deep.equal(findAllDomains);
  });

  it('Should find a Motorcycle and return a Motorcycle domain', async function () {
    sinon.stub(Model, 'findById').resolves(outputMotorcycle);
    const service = new MotorcycleService();
    const response = await service.findMotorcycleById(motorcycleIdInput);

    expect(response).to.deep.equal(outputDomainMotorcycle);
  });

  it('Should update a Motorcycle and return a Motorcycle domain', async function () {
    sinon.stub(Model, 'findByIdAndUpdate').resolves(outputMotorcycle);
    const service = new MotorcycleService();
    const response = await service.updateMotorcycle(motorcycleIdInput, inputMotorcycle);

    expect(response).to.deep.equal(outputDomainMotorcycle);
  });

  it('Should delete a Motorcycle and return null', async function () {
    const deleteOutput = { deletedCount: 1, acknowledged: true };

    sinon.stub(Model, 'deleteOne').resolves(deleteOutput);
    const service = new MotorcycleService();
    const response = await service.deleteMotorcycle(motorcycleIdInput);

    expect(response).to.equal(1);
  });

  it('Should return null when creating a Motorcycle domain missing data', async function () {
    sinon.stub(Model, 'findById').resolves(null);

    const service = new MotorcycleService();
    const response = await service.findMotorcycleById(motorcycleIdInput);

    expect(response).to.equal(null);
  });
});