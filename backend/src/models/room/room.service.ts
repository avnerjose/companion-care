import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dtos/create-room.dto';
import { UpdateRoomDto } from './dtos/update-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRoomDto) {
    const roomAlreadyExists = await this.prisma.room.findFirst({
      where: {
        name: data.name,
        sectorId: data.sectorId,
      },
    });

    if (roomAlreadyExists) {
      throw new Error('Room already registered');
    }

    const sectorExists = await this.prisma.sector.findUnique({
      where: {
        id: data.sectorId,
      },
    });

    if (!sectorExists) {
      throw new Error("Sector doesn't exists");
    }

    const room = await this.prisma.room.create({
      data,
    });

    return room;
  }

  async findAll() {
    return this.prisma.room.findMany({
      include: {
        sector: true,
      },
    });
  }

  async findOne(id: number) {
    const room = await this.prisma.room.findFirst({
      where: {
        id,
      },
    });

    if (!room) {
      throw Error('Room not found');
    }

    return room;
  }

  async update(id: number, data: UpdateRoomDto) {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
    });

    if (!room) {
      throw Error('Room not found');
    }

    return this.prisma.room.update({
      data,
      where: { id },
    });
  }

  async remove(id: number) {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
    });

    if (!room) {
      throw Error('Room not found');
    }

    return this.prisma.room.delete({
      where: {
        id,
      },
    });
  }
}
