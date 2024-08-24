import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository.ts';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  const usersService = {
    findAll: () => [{ id: 1, name: 'Jeremy', email: 'jeremy@google.com' }],
    findOne: (id: number) => ({
      id,
      name: 'Jeremy',
      email: 'jeremy@google.com',
    }),
    create: (user: { id: number; name: string; email: string }) => user,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .overrideProvider(UsersRepository)
      .useValue({
        findAll: () => [{ id: 1, name: 'Jeremy', email: 'jeremy@google.com' }],
        findOne: (id: number) => ({
          id,
          name: 'Jeremy',
          email: 'jeremy@google.com',
        }),
        create: (user: { id: number; name: string; email: string }) => user,
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect(usersService.findAll());
  });

  it('/users/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect(usersService.findOne(1));
  });

  it('/users (POST)', () => {
    const newUser = { id: 9, name: 'Jane Doe', email: 'jane.doe@example.com' };
    return request(app.getHttpServer())
      .post('/users')
      .send(newUser)
      .expect(201)
      .expect({ message: 'User created' });
  });

  it('/users/:id (GET) - not found', () => {
    jest.spyOn(usersService, 'findOne').mockImplementation(() => undefined);

    return request(app.getHttpServer()).get('/users/999').expect(404).expect({
      statusCode: 404,
      message: 'User not found',
      error: 'Not Found',
    });
  });

  it('/users (POST) - validation failure', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: '', email: 'invalid-email' })
      .expect(400)
      .expect({
        statusCode: 400,
        message: ['Name should not be empty', 'Invalid email'],
        error: 'Bad Request',
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
