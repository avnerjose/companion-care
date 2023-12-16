import { Injectable } from '@nestjs/common';
import { Patient } from '@prisma/client';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePatientDto } from './dtos/create-patient.dto';
import { UpdatePatientDto } from './dtos/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(data: CreatePatientDto): Promise<Patient> {
    const hospitalExists = await this.prisma.hospital.findUnique({
      where: {
        id: data.hospitalId,
      },
    });

    if (!hospitalExists) {
      throw new Error("Hospital doesn't exists");
    }

    const patient = await this.prisma.patient.create({
      data,
    });

    this.eventEmitter.emit('patient.create', {
      payload: data,
    });

    return patient;
  }

  async findAll(): Promise<Patient[]> {
    return this.prisma.patient.findMany();
  }

  async findOne(id: number): Promise<Patient> {
    const patient = await this.prisma.patient.findUnique({
      where: {
        id,
      },
    });

    if (!patient) {
      throw Error('Patient not found');
    }

    return patient;
  }

  async findOneByCpf(cpf: string): Promise<Patient> {
    const patient = await this.prisma.patient.findFirst({
      where: { cpf },
    });

    if (!patient) {
      throw Error('Patient not found');
    }

    return patient;
  }

  async update(id: number, data: UpdatePatientDto): Promise<Patient> {
    const patient = await this.prisma.patient.findUnique({
      where: {
        id,
      },
    });

    if (!patient) {
      throw Error('Patient not found');
    }

    this.eventEmitter.emit('patient.update', patient);

    return this.prisma.patient.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: {
        id,
      },
    });

    if (!patient) {
      throw Error('Patient not found');
    }

    return this.prisma.patient.delete({
      where: {
        id,
      },
    });
  }
}
