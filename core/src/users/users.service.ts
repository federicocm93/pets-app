import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private userModel: Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await (await this.userModel.create(createUserDto)).toObject();
  }

  async findById(id: number) {
    return await this.userModel.findById(id);
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username: username });
  }
}
