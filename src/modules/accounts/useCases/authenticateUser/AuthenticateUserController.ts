import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenicateUserUseCase = container.resolve(AuthenticateUserUseCase);

    try {
      const authenticationInfo = await authenicateUserUseCase.execute({
        email,
        password,
      });

      return response.json(authenticationInfo);
    } catch (error) {
      return response.status(400).json({
        message: error.message,
      });
    }
  }
}

export { AuthenticateUserController };
