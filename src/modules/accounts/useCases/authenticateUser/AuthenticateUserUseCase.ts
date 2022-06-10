import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../../repositories/IUsersRepository';

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
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // usuário existe?
    const userExists = await this.usersRepository.findByEmail(email);

    if (!userExists) {
      throw new Error('Email or password incorrect');
    }

    // senha está correta?

    const passwordMatch = await compare(password, userExists.password);
    if (!passwordMatch) {
      throw new Error('Email or password incorrect');
    }
    // gerar token

    const token = sign({}, 'pedroignitenode', {
      subject: userExists.id,
      expiresIn: '1d',
    });

    return {
      user: {
        name: userExists.name,
        email: userExists.email,
      },
      token,
    };
  }
}

export { AuthenticateUserUseCase };
