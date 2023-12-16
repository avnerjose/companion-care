import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsISO8601,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'CPF é obrigatório',
  })
  @IsString({
    message: 'CPF precisa ser uma string',
  })
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF deve ter o formato 000.000.000-00',
  })
  readonly cpf: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Nome é obrigatório',
  })
  @IsString({
    message: 'Nome precisa ser uma string',
  })
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Data de nascimento é obrigatória',
  })
  @IsISO8601()
  readonly dateOfBirth: Date;

  @ApiProperty()
  @IsNotEmpty({
    message: 'E-email é obrigatório',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Sexo é obrigatório',
  })
  @IsString({
    message: 'Sexo inválido',
  })
  @Matches(/^(M|F)$/, {
    message: 'Sexo deve ser "M" ou "F"',
  })
  readonly sex: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Cidade é obrigatória',
  })
  @IsString({
    message: 'Cidade inválida',
  })
  readonly city: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Número de telefone é obrigatório',
  })
  @IsString({
    message: 'Número de telefone inválido',
  })
  @Matches(/^(\([1-9]{2}\))\s(9\d{4}-\d{4})$/, {
    message: 'Número de telefone deve ter o formato (00) 00000-0000',
  })
  readonly phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Status é obrigatório',
  })
  @IsString({
    message: 'Status inválido',
  })
  readonly status: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'ID do hospital é obrigatório',
  })
  @IsInt({
    message: 'ID do hospital deve ser um número inteiro',
  })
  readonly hospitalId: number;
}
