import { Test, TestingModule } from '@nestjs/testing';
import { PetsService } from './pets.service';
import { Pet } from './entities/pet.entity';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { CreatePetDto } from './dto/create-pet.dto';
import { User } from '../users/entities/user.entity';
import { Role } from '../auth/enums/role.enum';
import { UsersService } from '../users/users.service';

describe('PetsService', () => {
  let petService: PetsService;
  let model: Model<Pet>;

  const mockUsersService = {
    create: jest.fn(),
    findById: jest.fn(),
    findByUsername: jest.fn(),
  };

  const mockUser = {
    _id: '1',
    name: 'testuser',
    username: 'testuser',
    email: 'testuser@gmail.com',
    password: 'hola1234',
    role: Role.User,
  };

  const mockPet = {
    _id: 'fmcsalc3252',
    name: 'Tito',
    breed: 'Labrador',
    image: 'http://www.unaurl.com',
    when: new Date(),
    user: mockUser,
  };

  const mockPetArray = [
    {
      _id: '1',
      name: 'Tito',
      breed: 'Labrador',
      image: 'http://www.unaurl.com',
      when: new Date(),
      user: mockUser,
    },
    {
      _id: '2',
      name: 'Lola',
      breed: 'Golden Retriever',
      image: 'http://www.unaurl2.com',
      when: new Date(),
      user: mockUser,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: UsersService, useValue: mockUsersService },
        { provide: getModelToken(User.name), useValue: Model },
        PetsService,
        { provide: getModelToken(Pet.name), useValue: Model },
      ],
    }).compile();

    petService = module.get<PetsService>(PetsService);
    model = module.get<Model<Pet>>(getModelToken(Pet.name));
  });

  it('should be defined', () => {
    expect(petService).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create and return a pet', async () => {
    const newPet = {
      name: 'Tito',
      breed: 'Labrador',
      image: 'http://www.unaurl.com',
      when: new Date(),
    };

    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve(mockPet as any));

    jest
      .spyOn(mockUsersService, 'findById')
      .mockImplementationOnce(() => Promise.resolve(mockUser));

    const result = await petService.create(newPet as CreatePetDto, '1');
    expect(result).toEqual(mockPet);
  });

  it('should find and return all pets', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(mockPetArray),
    } as any);

    jest.spyOn(model, 'countDocuments').mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(mockPetArray.length),
    } as any);

    const result = await petService.findAll();
    expect(result).toEqual({ total: mockPetArray.length, items: mockPetArray });
  });
});
