import { Module } from '@nestjs/common';
import '@nestjs/platform-socket.io';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { PatientModule } from './models/patient/patient.module';
import { SocketModule } from './socket/socket.module';
import { DoctorModule } from './models/doctor/doctor.module';
import { HospitalModule } from './models/hospital/hospital.module';
import { SectorModule } from './models/sector/sector.module';
import { RoomModule } from './models/room/room.module';
import { LocationRecordModule } from './models/locationRecord/location-record.module';
import { CompanionModule } from './models/companion/companion.module';
import { HospitalProcedureModule } from './models/hospital_procedure/hospital-procedure.module';
import { ObservationModule } from './models/observation/observation.module';
import { AuthModule } from './auth/auth.module';
import { VerificationCodeModule } from './auth/models/verification_code/verification-code.module';

@Module({
  imports: [
    PatientModule,
    SocketModule,
    EventEmitterModule.forRoot(),
    DoctorModule,
    HospitalModule,
    SectorModule,
    RoomModule,
    LocationRecordModule,
    CompanionModule,
    HospitalProcedureModule,
    ObservationModule,
    VerificationCodeModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
