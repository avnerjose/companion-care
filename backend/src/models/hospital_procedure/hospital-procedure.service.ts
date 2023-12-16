import { Injectable } from '@nestjs/common';
import { HospitalProcedure } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateHospitalProcedureDto } from './dtos/create-hospital-procedure.dto';
import { UpdateHospitalProcedureDto } from './dtos/update-hospital-procedure.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class HospitalProcedureService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
  ) {}

  async create(data: CreateHospitalProcedureDto) {
    const hospitalProcedureStillOpen =
      await this.prisma.hospitalProcedure.findFirst({
        where: {
          patientId: data.patientId,
          status: {
            not: 'closed',
          },
        },
      });

    if (hospitalProcedureStillOpen) {
      throw new Error('HospitalProcedure still opened');
    }

    const hospitalExists = await this.prisma.hospital.findUnique({
      where: {
        id: data.hospitalId,
      },
    });

    if (!hospitalExists) {
      throw new Error("Hospital doesn't exists");
    }

    const patientExists = await this.prisma.patient.findUnique({
      where: {
        id: data.patientId,
      },
    });

    if (!patientExists) {
      throw new Error("Patient doesn't exists");
    }

    const doctorExists = await this.prisma.doctor.findUnique({
      where: {
        id: data.doctorId,
      },
    });

    if (!doctorExists) {
      throw new Error("Doctor doesn't exists");
    }

    if (data.companionId) {
      const companionExists = await this.prisma.companion.findUnique({
        where: {
          id: data.companionId,
        },
      });

      if (!companionExists) {
        throw new Error("Companion doesn't exists");
      }
    }

    const hospitalProcedure = await this.prisma.hospitalProcedure.create({
      data,
    });

    this.eventEmitter.emit('hospitalProcedure.update', hospitalProcedure);
    this.eventEmitter.emit('patient.update', patientExists);

    return hospitalProcedure;
  }

  async findAll(): Promise<HospitalProcedure[]> {
    return this.prisma.hospitalProcedure.findMany();
  }

  async findOne(id: number): Promise<HospitalProcedure> {
    const hospitalProcedure = await this.prisma.hospitalProcedure.findFirst({
      include: {
        observations: true,
        locationRecords: {
          include: {
            room: {
              include: {
                sector: true,
              },
            },
          },
        },
      },
      where: {
        id,
      },
    });

    if (!hospitalProcedure) {
      throw Error('HospitalProcedure not found');
    }

    return hospitalProcedure;
  }

  async findAllFromPatient(patientId: number) {
    const hospitalProcedure = await this.prisma.hospitalProcedure.findMany({
      include: {
        observations: true,
        locationRecords: {
          include: {
            room: {
              include: {
                sector: true,
              },
            },
          },
        },
      },
      where: {
        patientId,
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    if (!hospitalProcedure) {
      throw Error('HospitalProcedure not found');
    }

    return hospitalProcedure;
  }

  async update(
    id: number,
    data: UpdateHospitalProcedureDto,
  ): Promise<HospitalProcedure> {
    const hospitalProcedure = await this.prisma.hospitalProcedure.findUnique({
      where: {
        id,
      },
    });

    if (!hospitalProcedure) {
      throw Error('HospitalProcedure not found');
    }

    return this.prisma.hospitalProcedure.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const hospitalProcedure = await this.prisma.hospitalProcedure.findUnique({
      where: {
        id,
      },
    });

    if (!hospitalProcedure) {
      throw Error('HospitalProcedure not found');
    }

    return this.prisma.hospitalProcedure.delete({
      where: {
        id,
      },
    });
  }
}
