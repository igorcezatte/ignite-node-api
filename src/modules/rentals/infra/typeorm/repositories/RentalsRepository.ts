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
        const openByCar = await this.respository.findOne({ car_id });

        return openByCar;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const openByUser = await this.respository.findOne({ user_id });

        return openByUser;
    }

    async create({
        car_id,
        expected_return_date,
        user_id,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.respository.create({
            car_id,
            expected_return_date,
            user_id,
        });

        await this.respository.save(rental);

        return rental;
    }
}

export { RentalsRepository };
