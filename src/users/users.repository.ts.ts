import { Injectable, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import * as fs from 'fs';

@Injectable()
export class UsersRepository {
  constructor(@Inject('DB_FILE_PATH') private readonly filePath: string) {}

  findAll(): User[] {
    return this.readFromFile();
  }

  findOne(id: number): User | undefined {
    const users = this.readFromFile();
    return users.find((user) => user.id === id);
  }

  create(user: User): void {
    const users = this.readFromFile();
    users.push(user);
    this.writeToFile(users);
  }

  private readFromFile(): User[] {
    if (!fs.existsSync(this.filePath)) {
      return [];
    }
    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data) as User[];
  }

  private writeToFile(users: User[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(users, null, 2));
  }
}
