import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ObservationService } from './observation.service';
import { CreateObservationDto } from './dtos/create-observation.dto';
import { UpdateObservationDto } from './dtos/update-observation.dto';
import { NotFoundException } from 'src/common/errors/not-found.exception';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Observação')
@Controller('observation')
export class ObservationController {
  constructor(private readonly observationService: ObservationService) {}

  @Post()
  async create(@Body() createObservationDto: CreateObservationDto) {
    try {
      const newObservation = await this.observationService.create(
        createObservationDto,
      );
      return newObservation;
    } catch (e) {
      switch (e.message) {
        case "HospitalProcedure doesn't exists":
          throw new NotFoundException('HospitalProcedure');
        default:
          throw new Error(e);
      }
    }
  }

  @Get()
  async findAll() {
    return this.observationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const observation = await this.observationService.findOne(+id);
      return observation;
    } catch (e) {
      switch (e.message) {
        case 'Observation not found':
          throw new NotFoundException('Observation');
        default:
          throw new Error(e);
      }
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateObservationDto: UpdateObservationDto,
  ) {
    try {
      const observation = await this.observationService.update(
        +id,
        updateObservationDto,
      );
      return observation;
    } catch (e) {
      switch (e.message) {
        case 'Observation not found':
          throw new NotFoundException('Observation');
        default:
          throw new Error(e);
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const observation = await this.observationService.remove(+id);
      return observation;
    } catch (e) {
      switch (e.message) {
        case 'Observation not found':
          throw new NotFoundException('Observation');
        default:
          throw new Error(e);
      }
    }
  }
}
