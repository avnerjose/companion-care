import { Module } from '@nestjs/common';
import { ObservationService } from './observation.service';
import { ObservationController } from './observation.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { PushNotificationService } from 'src/notifications/push-notification.service';

@Module({
  controllers: [ObservationController],
  providers: [ObservationService, PrismaService, PushNotificationService],
})
export class ObservationModule {}
