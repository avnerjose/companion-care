import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(entityName: string) {
    super(`${entityName} not found`, HttpStatus.NOT_FOUND);
  }
}
