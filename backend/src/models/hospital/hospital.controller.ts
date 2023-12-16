import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dtos/create-hospital.dto';
import { UpdateHospitalDto } from './dtos/update-hospital.dto';
import { AlreadyRegisteredException } from 'src/common/errors/already-registered.exception';
import { NotFoundException } from 'src/common/errors/not-found.exception';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Hospital')
@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @Post()
  async create(@Body() createHospitalDto: CreateHospitalDto) {
    try {
      const newHospital = await this.hospitalService.create(createHospitalDto);
      return newHospital;
    } catch (e) {
      switch (e.message) {
        case 'Hospital already registered':
          throw new AlreadyRegisteredException('Hospital');
        default:
          throw new Error(e);
      }
    }
  }

  @Get()
  findAll() {
    return this.hospitalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const hospital = await this.hospitalService.findOne(+id);
      return hospital;
    } catch (e) {
      switch (e.message) {
        case 'Hospital not found':
          throw new NotFoundException('Hospital');
        default:
          throw new Error(e);
      }
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHospitalDto: UpdateHospitalDto,
  ) {
    try {
      const hospital = this.hospitalService.update(+id, updateHospitalDto);
      return hospital;
    } catch (e) {
      switch (e.message) {
        case 'Hospital not found':
          throw new NotFoundException('Hospital');
        default:
          throw new Error(e);
      }
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      const hospital = this.hospitalService.remove(+id);
      return hospital;
    } catch (e) {
      switch (e.message) {
        case 'Hospital not found':
          throw new NotFoundException('Hospital');
        default:
          throw new Error(e);
      }
    }
  }
}
