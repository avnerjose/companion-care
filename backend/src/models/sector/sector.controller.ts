import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SectorService } from './sector.service';
import { CreateSectorDto } from './dtos/create-sector.dto';
import { UpdateSectorDto } from './dtos/update-sector.dto';
import { AlreadyRegisteredException } from 'src/common/errors/already-registered.exception';
import { NotFoundException } from 'src/common/errors/not-found.exception';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Setor')
@Controller('sector')
export class SectorController {
  constructor(private readonly sectorService: SectorService) {}

  @Post()
  async create(@Body() createSectorDto: CreateSectorDto) {
    try {
      const newSector = await this.sectorService.create(createSectorDto);
      return newSector;
    } catch (e) {
      switch (e.message) {
        case 'Sector already registered':
          throw new AlreadyRegisteredException('Sector');
        case "Hospital doesn't exists":
          throw new NotFoundException('Hospital');
        default:
          throw new Error(e);
      }
    }
  }

  @Get()
  async findAll() {
    return this.sectorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const sector = await this.sectorService.findOne(+id);
      return sector;
    } catch (e) {
      switch (e.message) {
        case 'Sector not found':
          throw new NotFoundException('Sector');
        default:
          throw new Error(e);
      }
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSectorDto: UpdateSectorDto,
  ) {
    try {
      const sector = await this.sectorService.update(+id, updateSectorDto);
      return sector;
    } catch (e) {
      switch (e.message) {
        case 'Sector not found':
          throw new NotFoundException('Sector');
        default:
          throw new Error(e);
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const sector = await this.sectorService.remove(+id);
      return sector;
    } catch (e) {
      switch (e.message) {
        case 'Sector not found':
          throw new NotFoundException('Sector');
        default:
          throw new Error(e);
      }
    }
  }
}
