import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateCompanionDto {
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
    message: 'E-mail é obrigatório',
  })
  @IsString({
    message: 'E-mail deve ser uma string',
  })
  @IsEmail()
  readonly email: string;
}
