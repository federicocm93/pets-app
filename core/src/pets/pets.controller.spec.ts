import { Test, TestingModule } from '@nestjs/testing';
import { PetsController } from './pets.controller';
import { PetsService } from './pets.service';
import { UsersService } from '../users/users.service';
import { Model } from 'mongoose';
import { User } from '../users/entities/user.entity';
import { getModelToken } from '@nestjs/mongoose';
import { Pet } from './entities/pet.entity';

describe('PetsController', () => {
  let controller: PetsController;

  const mockUsersService = {
    create: jest.fn(),
    findById: jest.fn(),
    findByUsername: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PetsController],
      providers: [
        PetsService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: getModelToken(User.name), useValue: Model },
        { provide: getModelToken(Pet.name), useValue: Model },
      ],
    }).compile();

    controller = module.get<PetsController>(PetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
