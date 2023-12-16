import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompanionService } from './companion.service';
import { CreateCompanionDto } from './dtos/create-companion.dto';
import { UpdateCompanionDto } from './dtos/update-companion.dto';
import { AlreadyRegisteredException } from 'src/common/errors/already-registered.exception';
import { NotFoundException } from 'src/common/errors/not-found.exception';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Acompanhante')
@Controller('companion')
export class CompanionController {
  constructor(private readonly companionService: CompanionService) {}

  @Post()
  async create(@Body() createCompanionDto: CreateCompanionDto) {
    try {
      const newCompanion = await this.companionService.create(
        createCompanionDto,
      );
      return newCompanion;
    } catch (e) {
      switch (e.message) {
        case 'Companion already registered':
          throw new AlreadyRegisteredException('Companion');
        default:
          throw new Error(e);
      }
    }
  }

  @Get()
  async findAll() {
    return this.companionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const companion = await this.companionService.findOne(+id);
      return companion;
    } catch (e) {
      switch (e.message) {
        case 'Companion not found':
          throw new NotFoundException('Companion');
        default:
          throw new Error(e);
      }
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanionDto: UpdateCompanionDto,
  ) {
    try {
      const companion = await this.companionService.update(
        +id,
        updateCompanionDto,
      );
      return companion;
    } catch (e) {
      switch (e.message) {
        case 'Companion not found':
          throw new NotFoundException('Companion');
        default:
          throw new Error(e);
      }
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const companion = await this.companionService.remove(+id);
      return companion;
    } catch (e) {
      switch (e.message) {
        case 'Companion not found':
          throw new NotFoundException('Companion');
        default:
          throw new Error(e);
      }
    }
  }
}
