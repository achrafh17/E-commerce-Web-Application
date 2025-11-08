import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

describe('UserService - createUser', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a new user successfully', async () => {
    const mockData = {
      username: 'Achraf',
      email: 'achraf@example.com',
      password: '123456',
    };

    const mockUser = {
      id: 1,
      username: 'Achraf',
      email: 'achraf@example.com',
      password: 'hashed_password',
      role: 'user',
      status: 'active',
      created_at: new Date(),
      updated_at: new Date(),
      deletedAt: null,
    };

    // Mock bcrypt and prisma
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_password');
    jest.spyOn(prisma.user, 'create').mockResolvedValue(mockUser);

    const result = await service.createUser(mockData);

    expect(bcrypt.hash).toHaveBeenCalledWith('123456', 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        username: 'Achraf',
        email: 'achraf@example.com',
        password: 'hashed_password',
      },
    });
    expect(result).toEqual(mockUser);
  });
});
