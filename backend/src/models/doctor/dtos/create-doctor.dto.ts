import { ApiProperty } from '@nestjs/swagger';
import {
  IsISO8601,
  IsNotEmpty,
  IsInt,
  IsString,
  Matches,
  IsEmail,
} from 'class-validator';

export class CreateDoctorDto {
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
    message: 'CRM é obrigatório',
  })
  @IsString({
    message: 'CRM precisa ser uma string',
  })
  @Matches(
    /^CRM\/(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)-\d{1,6}$/,
    {
      message: 'CRM deve seguir o formato CRM/MG-000000',
    },
  )
  readonly crm: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'E-email é obrigatório',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Especialidade é obrigatório',
  })
  @IsString({
    message: 'Especialidade inválida',
  })
  readonly specialty: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Data de nascimento é obrigatória',
  })
  @IsISO8601()
  readonly dateOfBirth: Date;

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
    message: 'ID do hospital é obrigatório',
  })
  @IsInt({
    message: 'ID do hospital deve ser um número inteiro',
  })
  readonly hospitalId: number;
}
