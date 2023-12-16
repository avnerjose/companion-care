import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dtos/create-room.dto';
import { UpdateRoomDto } from './dtos/update-room.dto';
import { AlreadyRegisteredException } from 'src/common/errors/already-registered.exception';
import { NotFoundException } from 'src/common/errors/not-found.exception';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Sala')
@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    try {
      const newRoom = await this.roomService.create(createRoomDto);
      return newRoom;
    } catch (e) {
      switch (e.message) {
        case 'Room already registered':
          throw new AlreadyRegisteredException('Room');
        case "Sector doesn't exists":
          throw new NotFoundException('Sector');
        default:
          throw new Error(e);
      }
    }
  }

  @Get()
  async findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const room = await this.roomService.findOne(+id);
      return room;
    } catch (e) {
      switch (e.message) {
        case 'Room not found':
          throw new NotFoundException('Room');
        default:
          throw new Error(e);
      }
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    try {
      const room = await this.roomService.update(+id, updateRoomDto);
      return room;
    } catch (e) {
      switch (e.message) {
        case 'Room not found':
          throw new NotFoundException('Room');
        default:
          throw new Error(e);
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const room = await this.roomService.remove(+id);
      return room;
    } catch (e) {
      switch (e.message) {
        case 'Room not found':
          throw new NotFoundException('Room');
        default:
          throw new Error(e);
      }
    }
  }
}
