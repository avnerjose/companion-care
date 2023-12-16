import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt, Matches } from 'class-validator';

export class CreateLocationRecordDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'CPF do paciente é obrigatório',
  })
  @IsString({
    message: 'CPF do paciente precisa ser uma string',
  })
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF do paciente deve ter o formato 000.000.000-00',
  })
  readonly patientCpf: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'ID da sala é obrigatório',
  })
  @IsInt({
    message: 'ID da sala deve ser um número inteiro',
  })
  readonly roomId: number;
}
