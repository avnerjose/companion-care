import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [SocketModule],
  controllers: [PatientController],
  providers: [PatientService, PrismaService],
})
export class PatientModule {}
