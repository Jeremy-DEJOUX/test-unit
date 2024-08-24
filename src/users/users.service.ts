import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository.ts';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne(id);
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    const users = await this.usersRepository.findAll();
    const newUser: User = {
      id: users.length + 1,
      ...createUserDto,
    };
    this.usersRepository.create(newUser);
  }
}
