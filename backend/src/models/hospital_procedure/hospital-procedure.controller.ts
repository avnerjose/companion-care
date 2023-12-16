import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HospitalProcedureService } from './hospital-procedure.service';
import { CreateHospitalProcedureDto } from './dtos/create-hospital-procedure.dto';
import { UpdateHospitalProcedureDto } from './dtos/update-hospital-procedure.dto';
import { AlreadyRegisteredException } from 'src/common/errors/already-registered.exception';
import { NotFoundException } from 'src/common/errors/not-found.exception';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Procedimento médico')
@Controller('hospital-procedure')
export class HospitalProcedureController {
  constructor(
    private readonly hospitalProcedureService: HospitalProcedureService,
  ) {}

  @Post()
  async create(@Body() createHospitalProcedureDto: CreateHospitalProcedureDto) {
    try {
      const newHospitalProcedure = await this.hospitalProcedureService.create(
        createHospitalProcedureDto,
      );
      return newHospitalProcedure;
    } catch (e) {
      switch (e.message) {
        case 'HospitalProcedure still opened':
          throw new AlreadyRegisteredException('HospitalProcedure');
        case "Hospital doesn't exists":
          throw new NotFoundException('Hospital');
        case "Patient doesn't exists":
          throw new NotFoundException('Patient');
        case "Doctor doesn't exists":
          throw new NotFoundException('Doctor');
        case "Companion doesn't exists":
          throw new NotFoundException('Companion');
        default:
          throw new Error(e);
      }
    }
  }

  @Get()
  async findAll(@Query('patientId') patientId: number) {
    if (patientId) {
      try {
        const hospitalProcedure =
          await this.hospitalProcedureService.findAllFromPatient(patientId);

        return hospitalProcedure.filter((hp) => hp.status !== 'closed');
      } catch (e) {
        switch (e.message) {
          case 'HospitalProcedure not found':
            throw new NotFoundException('HospitalProcedure');
          default:
            throw new Error(e);
        }
      }
    }
    return this.hospitalProcedureService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const hospitalProcedure = await this.hospitalProcedureService.findOne(
        +id,
      );
      return hospitalProcedure;
    } catch (e) {
      switch (e.message) {
        case 'HospitalProcedure not found':
          throw new NotFoundException('HospitalProcedure');
        default:
          throw new Error(e);
      }
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHospitalProcedureDto: UpdateHospitalProcedureDto,
  ) {
    try {
      const hospitalProcedure = await this.hospitalProcedureService.update(
        +id,
        updateHospitalProcedureDto,
      );
      return hospitalProcedure;
    } catch (e) {
      switch (e.message) {
        case 'HospitalProcedure not found':
          throw new NotFoundException('HospitalProcedure');
        default:
          throw new Error(e);
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.hospitalProcedureService.remove(+id);
    } catch (e) {
      switch (e.message) {
        case 'HospitalProcedure not found':
          throw new NotFoundException('HospitalProcedure');
        default:
          throw new Error(e);
      }
    }
  }
}
