import { AppError } from '@shared/errors/AppError';

import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it('Should be able to create a new car', async () => {
        const car = await createCarUseCase.execute({
            name: 'Jeep',
            description: 'Description',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'category',
        });

        expect(car).toHaveProperty('id');
    });

    it('Should not be able to create a car with exists license plate', () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: 'Jeep1',
                description: 'Description',
                daily_rate: 100,
                license_plate: 'ABC-1234',
                fine_amount: 60,
                brand: 'Brand',
                category_id: 'category',
            });

            await createCarUseCase.execute({
                name: 'Jeep2',
                description: 'Description',
                daily_rate: 100,
                license_plate: 'ABC-1234',
                fine_amount: 60,
                brand: 'Brand',
                category_id: 'category',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to create a car with available true by default', async () => {
        expect(async () => {
            const car = await createCarUseCase.execute({
                name: 'Jeep Available',
                description: 'Description',
                daily_rate: 100,
                license_plate: 'ABC-1234',
                fine_amount: 60,
                brand: 'Brand',
                category_id: 'category',
            });

            expect(car.available).toBe(true);
        });
    });
});
