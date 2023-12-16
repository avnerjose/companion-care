import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsInt({
    message: 'ID deve ser um número inteiro',
  })
  @IsNotEmpty({
    message: 'ID é obrigatório',
  })
  readonly id: number;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Nome é obrigatório',
  })
  @IsString({
    message: 'O nome deve ser uma string',
  })
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'ID do hospital é obrigatório',
  })
  @IsInt({
    message: 'ID do hospital deve ser um número inteiro',
  })
  readonly sectorId: number;
}
