import { Injectable } from '@nestjs/common';
import { CreateLocationRecordDto } from './dtos/create-location-record.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { HospitalProcedureService } from '../hospital_procedure/hospital-procedure.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PushNotificationService } from 'src/notifications/push-notification.service';

@Injectable()
export class LocationRecordService {
  constructor(
    private prisma: PrismaService,
    private hospitalProcedureService: HospitalProcedureService,
    private eventEmitter: EventEmitter2,
    private pushNotification: PushNotificationService,
  ) {}

  async create(data: CreateLocationRecordDto) {
    const locationRecordAlreadyExists =
      (await this.findMostRecent(data.patientCpf))?.roomId === data.roomId;

    if (locationRecordAlreadyExists) {
      throw new Error('LocationRecord already registered');
    }

    const roomExists = await this.prisma.room.findUnique({
      where: {
        id: data.roomId,
      },
    });

    if (!roomExists) {
      throw new Error("Room doesn't exists");
    }

    const patientExists = await this.prisma.patient.findUnique({
      where: {
        cpf: data.patientCpf,
      },
    });

    if (!patientExists) {
      throw new Error("Patient doesn't exists");
    }

    let mostRecentHospitalProcedure = (
      await this.hospitalProcedureService.findAllFromPatient(patientExists.id)
    )[0];

    if (!mostRecentHospitalProcedure) {
      throw new Error("HospitalProcedure doesn't exists");
    }

    const locationRecord = await this.prisma.locationRecord.create({
      data: {
        roomId: data.roomId,
        hospitalProcedureId: mostRecentHospitalProcedure.id,
      },
    });

    if (roomExists.relatedStatus) {
      await this.prisma.patient.update({
        where: {
          cpf: data.patientCpf,
        },
        data: {
          ...patientExists,
          status: roomExists.relatedStatus,
        },
      });
    }

    mostRecentHospitalProcedure = (
      await this.hospitalProcedureService.findAllFromPatient(patientExists.id)
    )[0];

    this.eventEmitter.emit(
      'hospitalProcedure.update',
      mostRecentHospitalProcedure,
    );

    if (mostRecentHospitalProcedure.companionId) {
      const companion = await this.prisma.companion.findUnique({
        where: { id: mostRecentHospitalProcedure.companionId },
      });
      const room = await this.prisma.room.findUnique({
        where: {
          id: data.roomId,
        },
        include: {
          sector: true,
        },
      });

      if (companion.notificationToken) {
        await this.pushNotification.sendPushNotification({
          title: 'Localização atualizada',
          token: companion.notificationToken,
          body: `Paciente movido para a sala '${room.name}' no setor '${room.sector.name}'`,
          type: 'location',
        });
      }
    }

    return locationRecord;
  }

  async findAllFromPatient(patientCpf: string) {
    const patient = await this.prisma.patient.findFirst({
      where: { cpf: patientCpf },
    });
    const mostRecentHospitalProcedure = (
      await this.hospitalProcedureService.findAllFromPatient(patient.id)
    )[0];

    if (!mostRecentHospitalProcedure) {
      throw new Error("HospitalProcedure doesn't exists");
    }

    return this.prisma.locationRecord.findMany({
      where: {
        hospitalProcedureId: mostRecentHospitalProcedure.id,
      },
      include: {
        room: {
          include: {
            sector: true,
          },
        },
      },
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  async findMostRecent(patientCpf: string) {
    const patient = await this.prisma.patient.findFirst({
      where: { cpf: patientCpf },
    });
    const mostRecentHospitalProcedure = (
      await this.hospitalProcedureService.findAllFromPatient(patient.id)
    )[0];

    if (!mostRecentHospitalProcedure) {
      throw new Error("HospitalProcedure doesn't exists");
    }

    const locationRecord = await this.prisma.locationRecord.findFirst({
      where: {
        hospitalProcedureId: mostRecentHospitalProcedure.id,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    return locationRecord;
  }

  async remove(id: number) {
    const locationRecord = await this.prisma.locationRecord.findUnique({
      where: {
        id,
      },
    });

    if (!locationRecord) {
      throw Error('LocationRecord not found');
    }

    const mostRecentHospitalProcedure =
      await this.hospitalProcedureService.findOne(
        locationRecord.hospitalProcedureId,
      );

    this.eventEmitter.emit(
      'hospitalProcedure.update',
      mostRecentHospitalProcedure,
    );

    return this.prisma.locationRecord.delete({
      where: {
        id,
      },
    });
  }
}
