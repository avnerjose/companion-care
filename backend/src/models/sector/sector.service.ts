import { Injectable } from '@nestjs/common';
import { CreateSectorDto } from './dtos/create-sector.dto';
import { UpdateSectorDto } from './dtos/update-sector.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SectorService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateSectorDto) {
    const sectorAlreadyExists = await this.prisma.sector.findFirst({
      where: {
        name: data.name,
        hospitalId: data.hospitalId,
      },
    });

    if (sectorAlreadyExists) {
      throw new Error('Sector already registered');
    }

    const hospitalExists = await this.prisma.hospital.findUnique({
      where: {
        id: data.hospitalId,
      },
    });

    if (!hospitalExists) {
      throw new Error("Hospital doesn't exists");
    }

    const sector = await this.prisma.sector.create({
      data,
    });

    return sector;
  }

  async findAll() {
    return this.prisma.sector.findMany();
  }

  async findOne(id: number) {
    const sector = await this.prisma.sector.findFirst({
      where: {
        id,
      },
    });

    if (!sector) {
      throw Error('Sector not found');
    }

    return sector;
  }

  async update(id: number, data: UpdateSectorDto) {
    const sector = await this.prisma.sector.findUnique({
      where: {
        id,
      },
    });

    if (!sector) {
      throw Error('Sector not found');
    }

    return this.prisma.sector.update({
      data,
      where: { id },
    });
  }

  async remove(id: number) {
    const sector = await this.prisma.sector.findUnique({
      where: {
        id,
      },
    });

    if (!sector) {
      throw Error('Sector not found');
    }

    return this.prisma.sector.delete({
      where: {
        id,
      },
    });
  }
}
