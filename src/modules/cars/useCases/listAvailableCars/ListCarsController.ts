import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { brand, name, category_id } = request.query;

        const listAvailableCarsController = container.resolve(
            ListAvailableCarsUseCase
        );

        const cars = await listAvailableCarsController.execute({
            name: name as string,
            category_id: category_id as string,
            brand: brand as string,
        });

        return response.json(cars);
    }
}

export { ListAvailableCarsController };
