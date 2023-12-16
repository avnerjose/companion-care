import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateHospitalDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'CNPJ é obrigatório',
  })
  @IsString({
    message: 'CNPJ precisa ser uma string',
  })
  @Matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: 'CNPJ deve ter o formato 00.000.000/0000-00',
  })
  readonly cnpj: string;

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
    message: 'Endereço é obrigatório',
  })
  @IsString({
    message: 'Endereço precisa ser uma string',
  })
  readonly address: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Especialidade é obrigatória',
  })
  @IsString({
    message: 'Especialidade precisa ser uma string',
  })
  readonly specialty: string;
}
