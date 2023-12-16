import { Injectable } from '@nestjs/common';
import { Doctor } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDoctorDto } from './dtos/create-doctor.dto';
import { UpdateDoctorDto } from './dtos/update-doctor.dto';

@Injectable()
export class DoctorService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDoctorDto) {
    const hospitalExists = await this.prisma.hospital.findUnique({
      where: {
        id: data.hospitalId,
      },
    });

    if (!hospitalExists) {
      throw new Error("Hospital doesn't exists");
    }

    const doctor = await this.prisma.doctor.create({
      data,
    });

    return doctor;
  }

  async findAll(): Promise<Doctor[]> {
    return this.prisma.doctor.findMany();
  }

  async findOneByEmail(email: string): Promise<Doctor> {
    const doctor = await this.prisma.doctor.findFirst({
      where: {
        email,
      },
    });

    if (!doctor) {
      throw Error('Doctor not found');
    }

    return doctor;
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        id,
      },
    });

    if (!doctor) {
      throw Error('Doctor not found');
    }

    return doctor;
  }

  async update(id: number, data: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        id,
      },
    });

    if (!doctor) {
      throw Error('Doctor not found');
    }

    return this.prisma.doctor.update({
      data,
      where: {
        id,
      },
    });
  }

  async remove(id: number) {
    const doctor = await this.prisma.doctor.findUnique({
      where: {
        id,
      },
    });

    if (!doctor) {
      throw Error('Doctor not found');
    }

    return this.prisma.doctor.delete({
      where: {
        id,
      },
    });
  }
}
