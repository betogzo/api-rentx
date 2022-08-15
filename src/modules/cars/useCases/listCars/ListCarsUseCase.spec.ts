import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from './ListCarsUseCase';

const testCar1 = {
  name: 'Passat',
  description: "Volkswagen's premium sedan",
  daily_rate: 129,
  license_plate: 'ANV-2504',
  fine_amount: 179,
  brand: 'Volkswagen',
  category_id: 'bfa7d5e7-c874-4885-b3d9-fe79fa0c419d',
};

const testCar2 = {
  available: false,
  name: 'Golf GTI',
  description: "Volkswagen's playboy hatch",
  daily_rate: 179,
  license_plate: 'BEM-9550',
  fine_amount: 99,
  brand: 'Volkswagen',
  category_id: 'bfa7d5e7-c874-4885-b3d9-fe79fa0c419d',
};

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({ ...testCar1 });
    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({ ...testCar1 });
    const cars = await listCarsUseCase.execute({ name: 'Golf GTI' });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available by brand', async () => {
    const car = await carsRepositoryInMemory.create({ ...testCar1 });
    const cars = await listCarsUseCase.execute({ brand: 'Volkswagen' });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available by category id', async () => {
    const car = await carsRepositoryInMemory.create({ ...testCar1 });
    const cars = await listCarsUseCase.execute({
      category_id: 'bfa7d5e7-c874-4885-b3d9-fe79fa0c419d',
    });

    expect(cars).toEqual([car]);
  });
});
