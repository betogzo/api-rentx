// import 'dotenv/config';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // 1 check if user exists
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError('Invalid user or password!', 401);

    // 2 check if password is correct
    const doesPasswordMatch = await compare(password, user.password);
    if (!doesPasswordMatch) throw new AppError('Invalid user or password!', 401);

    // 3 generate jwt
    const token = sign({}, process.env.SECRET_KEY, {
      subject: user.id,
      expiresIn: '1d',
    });
    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
