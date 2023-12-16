import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LocationRecordService } from './location-record.service';
import { CreateLocationRecordDto } from './dtos/create-location-record.dto';
import { AlreadyRegisteredException } from 'src/common/errors/already-registered.exception';
import { NotFoundException } from 'src/common/errors/not-found.exception';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Registro de localização')
@Controller('location-record')
export class LocationRecordController {
  constructor(private readonly locationRecordService: LocationRecordService) {}

  @Post()
  async create(@Body() createLocationRecordDto: CreateLocationRecordDto) {
    try {
      const newLocationRecord = await this.locationRecordService.create(
        createLocationRecordDto,
      );
      return newLocationRecord;
    } catch (e) {
      switch (e.message) {
        case 'LocationRecord already registered':
          throw new AlreadyRegisteredException('LocationRecord');
        case "Room doesn't exists":
          throw new NotFoundException('Room');
        case "Patient doesn't exists":
          throw new NotFoundException('Patient');
        case "HospitalProcedure doesn't exists":
          throw new NotFoundException('HospitalProcedure');
        default:
          throw new Error(e);
      }
    }
  }

  @Get()
  async findAllFromPatient(@Query('cpf') patientCpf: string) {
    if (!patientCpf) {
      throw new HttpException('Patient CPF not sent', HttpStatus.BAD_REQUEST);
    }

    return this.locationRecordService.findAllFromPatient(patientCpf);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const locationRecord = await this.locationRecordService.remove(+id);
      return locationRecord;
    } catch (e) {
      switch (e.message) {
        case 'LocationRecord not found':
          throw new NotFoundException('LocationRecord');
        default:
          throw new Error(e);
      }
    }
  }
}
