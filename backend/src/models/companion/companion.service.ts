import { Injectable } from '@nestjs/common';
import { CreateCompanionDto } from './dtos/create-companion.dto';
import { UpdateCompanionDto } from './dtos/update-companion.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CompanionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCompanionDto) {
    const companionAlreadyExists = await this.prisma.companion.findFirst({
      where: {
        email: data.email,
      },
    });

    if (companionAlreadyExists) {
      throw new Error('Companion already registered');
    }

    const companion = await this.prisma.companion.create({
      data,
    });

    return companion;
  }

  async findAll() {
    return this.prisma.companion.findMany();
  }

  async findOneByEmail(email: string) {
    const companion = await this.prisma.companion.findFirst({
      where: {
        email,
      },
    });

    if (!companion) {
      throw new Error('Companion not found');
    }

    return companion;
  }

  async findOne(id: number) {
    const companion = await this.prisma.companion.findFirst({
      where: {
        id,
      },
    });

    if (!companion) {
      throw Error('Companion not found');
    }

    return companion;
  }

  async update(id: number, data: UpdateCompanionDto) {
    const companion = await this.prisma.companion.findUnique({
      where: {
        id,
      },
    });

    if (!companion) {
      throw Error('Companion not found');
    }

    return this.prisma.companion.update({
      data,
      where: { id },
    });
  }

  async addNotificationToken(id: number, notificationToken: string) {
    const companion = await this.prisma.companion.findUnique({
      where: {
        id,
      },
    });

    if (!companion) {
      throw Error('Companion not found');
    }

    return this.prisma.companion.update({
      data: {
        ...companion,
        notificationToken,
      },
      where: { id },
    });
  }

  async remove(id: number) {
    const companion = await this.prisma.companion.findUnique({
      where: {
        id,
      },
    });

    if (!companion) {
      throw Error('Companion not found');
    }

    return this.prisma.companion.delete({
      where: {
        id,
      },
    });
  }
}
