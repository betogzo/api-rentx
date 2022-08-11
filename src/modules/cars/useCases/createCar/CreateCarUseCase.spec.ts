import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Fake Car',
      description: 'Fake Description',
      daily_rate: 121212121,
      license_plate: 'FAKE1100',
      fine_amount: 121212122,
      brand: 'Fake Brand',
      category_id: '1111111',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to register a car with already existing license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Fake Car 1',
        description: 'Fake Description',
        daily_rate: 121212121,
        license_plate: 'FAKE1100',
        fine_amount: 121212122,
        brand: 'Fake Brand',
        category_id: '1111111',
      });

      await createCarUseCase.execute({
        name: 'Fake Car 2',
        description: 'Fake Description',
        daily_rate: 121212121,
        license_plate: 'FAKE1100',
        fine_amount: 121212122,
        brand: 'Fake Brand',
        category_id: '1111111',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a car as available by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'Fake Available Car',
      description: 'Fake Description',
      daily_rate: 121212121,
      license_plate: 'FAKE-1111',
      fine_amount: 121212122,
      brand: 'Fake Brand',
      category_id: '1111111',
    });

    expect(car.available).toBe(true);
  });
});
