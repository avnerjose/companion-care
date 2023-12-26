import { Injectable } from '@nestjs/common';
import { CreateObservationDto } from './dtos/create-observation.dto';
import { UpdateObservationDto } from './dtos/update-observation.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PushNotificationService } from 'src/notifications/push-notification.service';

@Injectable()
export class ObservationService {
  constructor(
    private prisma: PrismaService,
    private eventEmitter: EventEmitter2,
    private pushNotification: PushNotificationService,
  ) {}

  async create(data: CreateObservationDto) {
    const hospitalProcedureExists =
      await this.prisma.hospitalProcedure.findUnique({
        where: {
          id: data.hospitalProcedureId,
        },
      });

    if (!hospitalProcedureExists) {
      throw new Error("HospitalProcedure doesn't exists");
    }

    const observation = await this.prisma.observation.create({
      data,
    });

    this.eventEmitter.emit('hospitalProcedure.update', hospitalProcedureExists);

    if (hospitalProcedureExists.companionId) {
      const companion = await this.prisma.companion.findUnique({
        where: {
          id: hospitalProcedureExists.companionId,
        },
      });

      if (companion.notificationToken) {
        this.pushNotification.sendPushNotification({
          token: companion.notificationToken,
          title: 'New observation created',
          body: 'The doctor created a new observation',
          type: 'observation',
        });
      }
    }

    return observation;
  }

  async findAll() {
    return this.prisma.observation.findMany();
  }

  async findOne(id: number) {
    const observation = await this.prisma.observation.findFirst({
      where: {
        id,
      },
    });

    if (!observation) {
      throw Error('Observation not found');
    }

    return observation;
  }

  async update(id: number, data: UpdateObservationDto) {
    const observation = await this.prisma.observation.findUnique({
      where: {
        id,
      },
    });

    if (!observation) {
      throw Error('Observation not found');
    }

    const hospitalProcedure = await this.prisma.hospitalProcedure.findUnique({
      where: {
        id: observation.hospitalProcedureId,
      },
    });

    this.eventEmitter.emit('hospitalProcedure.update', hospitalProcedure);

    return this.prisma.observation.update({
      data,
      where: { id },
    });
  }

  async remove(id: number) {
    const observation = await this.prisma.observation.findUnique({
      where: {
        id,
      },
    });

    if (!observation) {
      throw Error('Observation not found');
    }

    const hospitalProcedure = await this.prisma.hospitalProcedure.findUnique({
      where: {
        id: observation.hospitalProcedureId,
      },
    });

    this.eventEmitter.emit('hospitalProcedure.update', hospitalProcedure);

    return this.prisma.observation.delete({
      where: {
        id,
      },
    });
  }
}
