import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  transport: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  @OnEvent('patient.create')
  sendMessage(payload: any) {
    this.server.emit('patient.create', { patient: JSON.stringify(payload) });
  }

  @OnEvent('patient.update')
  sendUpdatedPatient(payload: any) {
    this.server.emit(`patient_${payload.id}_update`, {
      patient: JSON.stringify(payload),
    });
  }

  @OnEvent('hospitalProcedure.update')
  sendUpdatedHospitalProcedure(payload: any) {
    this.server.emit(`hospitalProcedure_${payload.id}_update`, {
      hospitalProcedure: JSON.stringify(payload),
    });
  }

  sendMessageToAllClients(eventName: string, message: string) {
    this.server.emit(eventName, message);
  }
}
