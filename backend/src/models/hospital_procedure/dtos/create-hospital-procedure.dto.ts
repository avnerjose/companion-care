import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  IsISO8601,
} from 'class-validator';

export class CreateHospitalProcedureDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'O tipo do procedimento é obrigatório',
  })
  @IsString({
    message: 'O tipo do procedimento precisa ser uma string',
  })
  readonly type: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'O status do procedimento é obrigatório',
  })
  @IsString({
    message: 'O status do procedimento precisa ser uma string',
  })
  readonly status: string;

  @ApiProperty()
  @IsISO8601()
  readonly startDate: Date;

  @ApiProperty()
  @IsNotEmpty({
    message: 'O ID do médico é obrigatório',
  })
  @IsInt({
    message: 'O ID do paciente precisa ser um número',
  })
  readonly doctorId: number;

  @ApiProperty()
  @IsInt({
    message: 'O ID do paciente precisa ser um número',
  })
  @IsNotEmpty({
    message: 'O ID do paciente é obrigatório',
  })
  readonly patientId: number;

  @ApiProperty()
  @IsOptional()
  @IsInt({
    message: 'O ID do acompanhante precisa ser um número',
  })
  readonly companionId?: number;

  @ApiProperty()
  @IsNotEmpty({
    message: 'O ID do hospital é obrigatório',
  })
  @IsInt({
    message: 'O ID do hospital precisa ser um número',
  })
  readonly hospitalId: number;
}
