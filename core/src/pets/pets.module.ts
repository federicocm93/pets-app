import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PetSchema } from './entities/pet.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Pet',
        schema: PetSchema,
      },
    ]),
  ],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
