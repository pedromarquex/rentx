import { Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  public async create({
    name,
    email,
    username,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      username,
      password,
      driver_license,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
