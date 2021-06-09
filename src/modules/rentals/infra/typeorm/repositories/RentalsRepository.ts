import { getRepository, Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
    private respository: Repository<Rental>;

    constructor() {
        this.respository = getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const openByCar = await this.respository.findOne({
            where: { car_id, end_date: null },
        });

        return openByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.respository.findOne({
            where: { user_id, end_date: null },
        });

        return openByUser;
    }

    async create({
        car_id,
        expected_return_date,
        user_id,
        id,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.respository.create({
            car_id,
            expected_return_date,
            user_id,
            id,
            end_date,
            total,
        });

        await this.respository.save(rental);

        return rental;
    }

    async findById(id: string): Promise<Rental> {
        const rental = this.respository.findOne(id);

        return rental;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = await this.respository.find({
            where: { user_id },
            relations: ['car'],
        });

        return rentals;
    }
}

export { RentalsRepository };
