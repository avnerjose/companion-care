import { Injectable } from '@nestjs/common';
import { Hospital, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HospitalService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.HospitalCreateInput) {
    const hospitalAlreadyExists = await this.prisma.hospital.findFirst({
      where: {
        cnpj: data.cnpj,
      },
    });

    if (hospitalAlreadyExists) {
      throw new Error('Hospital already registered');
    }

    const hospital = await this.prisma.hospital.create({
      data,
    });

    return hospital;
  }

  async findAll(): Promise<Hospital[]> {
    return this.prisma.hospital.findMany();
  }

  async findOne(id: number): Promise<Hospital> {
    const hospital = await this.prisma.hospital.findFirst({
      where: {
        id,
      },
    });

    if (!hospital) {
      throw Error('Hospital not found');
    }

    return hospital;
  }

  async update(
    id: number,
    data: Prisma.HospitalUpdateInput,
  ): Promise<Hospital> {
    const hospital = await this.prisma.hospital.findUnique({
      where: {
        id,
      },
    });

    if (!hospital) {
      throw Error('Hospital not found');
    }

    return this.prisma.hospital.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const hospital = await this.prisma.hospital.findUnique({
      where: {
        id,
      },
    });

    if (!hospital) {
      throw Error('Hospital not found');
    }

    return this.prisma.hospital.delete({
      where: {
        id,
      },
    });
  }
}
