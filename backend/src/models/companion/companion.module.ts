import { Module } from '@nestjs/common';
import { CompanionService } from './companion.service';
import { CompanionController } from './companion.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CompanionController],
  providers: [CompanionService, PrismaService],
  exports: [CompanionService],
})
export class CompanionModule {}
