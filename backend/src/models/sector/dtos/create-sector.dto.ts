import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateSectorDto {
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
  readonly hospitalId: number;
}
