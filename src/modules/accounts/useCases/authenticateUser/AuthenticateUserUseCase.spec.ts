import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });
    it('Should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '000123',
            email: 'johndoe@test.com',
            password: '123456',
            name: 'John Doe',
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        console.log(result);
        expect(result).toHaveProperty('token');
    });

    it('Should not be able to authenticate an non existent user', () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'fake@test.com',
                password: 'fakepass',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should not be able to authenticate an user with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '999',
                email: 'johndoe@test.com',
                password: '123456',
                name: 'John Doe',
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectpassword',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
