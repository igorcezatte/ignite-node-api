import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject('CarsImagesRepository')
        private carsImagesRepository: ICarsImagesRepository,

        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}

    async execute({ car_id, images_name }: IRequest): Promise<void> {
        const car = await this.carsRepository.findById(car_id);
        if (!car) {
            throw new AppError('Car does not exsits');
        }

        images_name.map(async (image) => {
            await this.carsImagesRepository.create(car_id, image);
        });
    }
}

export { UploadCarImagesUseCase };
