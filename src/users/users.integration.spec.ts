import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from '../app.module';
import { User } from './interfaces/user.interface';

describe('UsersController (Integration)', () => {
  let app: INestApplication;
  let tempDbFilePath: string;

  beforeAll(async () => {
    tempDbFilePath = path.join(
      __dirname,
      'db',
      `test-users-${Date.now()}.json`,
    );
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider('DB_FILE_PATH')
      .useValue(tempDbFilePath)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  beforeEach(() => {
    fs.writeFileSync(tempDbFilePath, JSON.stringify([]));
  });

  afterEach(() => {
    if (fs.existsSync(tempDbFilePath)) {
      fs.unlinkSync(tempDbFilePath);
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it('/users (GET) - should return an empty list', () => {
    return request(app.getHttpServer()).get('/users').expect(200).expect([]);
  });

  it('/users (POST) - should create a new user', () => {
    const newUser = { name: 'John Doe', email: 'john.doe@example.com' };
    return request(app.getHttpServer())
      .post('/users')
      .send(newUser)
      .expect(201)
      .expect({ message: 'User created' })
      .then(() => {
        const users: User[] = JSON.parse(
          fs.readFileSync(tempDbFilePath, 'utf-8'),
        );
        expect(users.length).toBe(1);
        expect(users[0]).toMatchObject(newUser);
      });
  });

  it('/users/:id (GET) - should return a user by ID', () => {
    const users: User[] = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    ];
    fs.writeFileSync(tempDbFilePath, JSON.stringify(users));

    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect(users[0]);
  });

  it('/users/:id (GET) - should return 404 if user not found', () => {
    return request(app.getHttpServer()).get('/users/999').expect(404).expect({
      statusCode: 404,
      message: 'User not found',
      error: 'Not Found',
    });
  });
});
