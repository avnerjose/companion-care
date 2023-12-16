import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dtos/create-doctor.dto';
import { UpdateDoctorDto } from './dtos/update-doctor.dto';
import { AlreadyRegisteredException } from 'src/common/errors/already-registered.exception';
import { NotFoundException } from 'src/common/errors/not-found.exception';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Médico')
@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  async create(@Body() createDoctorDto: CreateDoctorDto) {
    try {
      const newDoctor = await this.doctorService.create(createDoctorDto);
      return newDoctor;
    } catch (e) {
      switch (e.message) {
        case 'Doctor already registered':
          throw new AlreadyRegisteredException('Patient');
        case "Hospital doesn't exists":
          throw new NotFoundException('Hospital');
        default:
          throw new Error(e);
      }
    }
  }

  @Get()
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const doctor = await this.doctorService.findOne(id);
      return doctor;
    } catch (e) {
      switch (e.message) {
        case 'Doctor not found':
          throw new NotFoundException('Doctor');
        default:
          throw new Error(e);
      }
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    try {
      const doctor = await this.doctorService.update(id, updateDoctorDto);
      return doctor;
    } catch (e) {
      switch (e.message) {
        case 'Doctor not found':
          throw new NotFoundException('Doctor');
        default:
          throw new Error(e);
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.doctorService.remove(id);
    } catch (e) {
      switch (e.message) {
        case 'Doctor not found':
          throw new NotFoundException('Doctor');
        default:
          throw new Error(e);
      }
    }
  }
}
