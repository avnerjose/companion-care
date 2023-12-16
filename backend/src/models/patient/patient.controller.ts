import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';
import { AlreadyRegisteredException } from 'src/common/errors/already-registered.exception';
import { NotFoundException } from 'src/common/errors/not-found.exception';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Paciente')
@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  async create(@Body() createPatientDto: CreatePatientDto) {
    try {
      const newPatient = await this.patientService.create(createPatientDto);
      return newPatient;
    } catch (e) {
      switch (e.message) {
        case 'Patient already registered':
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
    return this.patientService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const patient = await this.patientService.findOne(id);
      return patient;
    } catch (e) {
      switch (e.message) {
        case 'Patient not found':
          throw new NotFoundException('Patient');
        default:
          throw new Error(e);
      }
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    try {
      const patient = await this.patientService.update(id, updatePatientDto);
      return patient;
    } catch (e) {
      switch (e.message) {
        case 'Patient not found':
          throw new NotFoundException('Patient');
        default:
          throw new Error(e);
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      await this.patientService.remove(id);
    } catch (e) {
      switch (e.message) {
        case 'Patient not found':
          throw new NotFoundException('Patient');
        default:
          throw new Error(e);
      }
    }
  }
}
