import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;

let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
    });

    it('Should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Jeep',
            description: 'Description',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'category_id',
        });
        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it('Should be able to list all available cars by brand', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Jeep2',
            description: 'Description',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand_test',
            category_id: 'category_id',
        });
        const cars = await listAvailableCarsUseCase.execute({
            brand: 'Brand_test',
        });

        expect(cars).toEqual([car]);
    });

    it('Should be able to list all available cars by name', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Jeep3',
            description: 'Description',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand_test',
            category_id: 'category_id',
        });
        const cars = await listAvailableCarsUseCase.execute({
            name: 'Jeep3',
        });

        expect(cars).toEqual([car]);
    });

    it('Should be able to list all available cars by category', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Jeep2',
            description: 'Description',
            daily_rate: 100,
            license_plate: 'ABC-1234',
            fine_amount: 60,
            brand: 'Brand_test',
            category_id: 'category_id',
        });
        const cars = await listAvailableCarsUseCase.execute({
            category_id: 'category_id',
        });

        expect(cars).toEqual([car]);
    });
});
