import { AppError } from '../../../../shared/errors/AppError';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { ICreateUsersDTO } from '../../repositories/IUsersRepository';
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
    const user: ICreateUsersDTO = {
      name: 'Test User',
      password: '1234',
      email: 'test@user.com',
      driver_license: 'ABC12345',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it(`Shouldn't be able to authenticate a non-existent user`, () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'alwaysfalseinfo@lie.com',
        password: 'this-is-so-fake',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it(`Shouldn't be able to authenticate legit user with wrong password`, async () => {
    expect(async () => {
      const user: ICreateUsersDTO = {
        name: 'Test User',
        password: '1234',
        email: 'test@user.com',
        driver_license: 'ABC12345',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'test@user.com',
        password: 'not-a-valid-password-bro',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
