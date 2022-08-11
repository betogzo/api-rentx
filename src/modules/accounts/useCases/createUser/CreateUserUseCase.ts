import { inject, injectable } from 'tsyringe';
import {
  ICreateUsersDTO,
  IUsersRepository,
} from '../../repositories/IUsersRepository';
import { hash } from 'bcryptjs';
import { AppError } from '../../../../shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute({
    name,
    password,
    email,
    driver_license,
  }: ICreateUsersDTO): Promise<void> {
    //validating unique email
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) throw new AppError('User already exists!', 400);

    //encrypting the password
    const encryptedPassword = await hash(password, 8);

    await this.userRepository.create({
      name,
      password: encryptedPassword,
      email,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
