import { Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectModel('Pet')
    private petModel: Model<Pet>,
  ) {}

  async create(createPetDto: CreatePetDto, userId: string) {
    return await this.petModel.create({ ...createPetDto, userId: userId });
  }

  async findAll() {
    return await this.petModel.find();
  }

  async findOne(id: number) {
    return await this.petModel.findById(id);
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    return await this.petModel.updateOne({ id: id }, updatePetDto);
  }

  remove(id: number) {
    return `This action removes a #${id} pet`;
  }
}
