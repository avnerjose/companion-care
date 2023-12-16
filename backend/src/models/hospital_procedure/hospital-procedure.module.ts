import { Module } from '@nestjs/common';
import { HospitalProcedureService } from './hospital-procedure.service';
import { HospitalProcedureController } from './hospital-procedure.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [HospitalProcedureController],
  providers: [HospitalProcedureService, PrismaService],
})
export class HospitalProcedureModule {}
