import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from './entities/pet.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Pet',
        schema: PetSchema,
      },
    ]),
    UsersModule,
  ],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
