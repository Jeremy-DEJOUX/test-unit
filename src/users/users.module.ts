import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository.ts';

@Module({
  providers: [
    UsersService,
    {
      provide: 'DB_FILE_PATH',
      useValue: './src/users/db/users.json',
    },
    UsersRepository,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
