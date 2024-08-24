import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository.ts';
import { User } from './interfaces/user.interface';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  let findAllMock: jest.MockedFunction<() => Promise<User[]>>;
  let findOneMock: jest.MockedFunction<
    (id: number) => Promise<User | undefined>
  >;
  let createMock: jest.MockedFunction<(user: User) => void>;

  beforeEach(async () => {
    findAllMock = jest.fn<Promise<User[]>, []>();
    findOneMock = jest.fn<Promise<User | undefined>, [number]>();
    createMock = jest.fn<void, [User]>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            findAll: findAllMock,
            findOne: findOneMock,
            create: createMock,
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should return all users', async () => {
    const result: User[] = [
      { id: 1, name: 'Jeremy', email: 'jeremy@google.com' },
    ];
    findAllMock.mockResolvedValue(result);

    expect(await service.findAll()).toBe(result);
  });

  it('should return one user', async () => {
    const result: User = { id: 1, name: 'Jeremy', email: 'jeremy@google.com' };
    findOneMock.mockResolvedValue(result);

    expect(await service.findOne(1)).toBe(result);
  });

  it('should create a user', async () => {
    const newUserDto = { name: 'Jane Doe', email: 'jane.doe@example.com' };
    const newUser: User = { id: 1, ...newUserDto };
    findAllMock.mockResolvedValue([]);
    createMock.mockImplementation(() => {});

    await service.create(newUserDto);
    expect(createMock).toHaveBeenCalledWith(newUser);
  });

  it('should return undefined if user not found', async () => {
    findOneMock.mockResolvedValue(undefined);

    expect(await service.findOne(999)).toBeUndefined();
  });
});
