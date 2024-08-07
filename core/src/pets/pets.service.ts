import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from './entities/pet.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class PetsService {
  constructor(
    @InjectModel('Pet')
    private petModel: Model<Pet>,
    private usersService: UsersService,
  ) {}

  async create(createPetDto: CreatePetDto, userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return await this.petModel.create({ ...createPetDto, user: user });
  }

  async findAll(limit: number = 4, skip: number = 0) {
    const total = await this.petModel.countDocuments().exec();
    const items = await this.petModel.find().limit(limit).skip(skip).exec();
    return { total, items };
  }

  async findAllByName(limit: number = 4, skip: number = 0, name) {
    const total = await this.petModel.countDocuments().exec();
    const items = await this.petModel
      .find({ name: { $regex: name, $options: 'i' } })
      .limit(limit)
      .skip(skip)
      .exec();
    return { total, items };
  }

  async findOne(id: string) {
    return await this.petModel.findById(id);
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    return await this.petModel.updateOne({ id: id }, updatePetDto);
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
