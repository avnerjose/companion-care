import { Module } from '@nestjs/common';
import { LocationRecordService } from './location-record.service';
import { LocationRecordController } from './location-record.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { HospitalProcedureService } from '../hospital_procedure/hospital-procedure.service';
import { PushNotificationService } from 'src/notifications/push-notification.service';

@Module({
  controllers: [LocationRecordController],
  providers: [
    LocationRecordService,
    PrismaService,
    HospitalProcedureService,
    PushNotificationService,
  ],
})
export class LocationRecordModule {}
