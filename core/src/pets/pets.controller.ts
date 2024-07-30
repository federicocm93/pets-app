import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private petsService: PetsService) {}

  @ApiBearerAuth()
  @Post()
  create(@Req() request: Request, @Body() createPetDto: CreatePetDto) {
    const user = request['user'];
    return this.petsService.create(createPetDto, user.sub);
  }

  @ApiBearerAuth()
  @Get()
  findAll(
    @Query('limit') limit: number,
    @Query('skip') skip: number,
    @Query('name') name: string,
  ) {
    if (name) {
      return this.petsService.findAllByName(limit, skip, name);
    }
    return this.petsService.findAll(limit, skip);
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petsService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petsService.update(+id, updatePetDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petsService.remove(+id);
  }
}
