import { HttpException, HttpStatus } from '@nestjs/common';

export class AlreadyRegisteredException extends HttpException {
  constructor(entityName: string) {
    super(`${entityName} already registered`, HttpStatus.CONFLICT);
  }
}
