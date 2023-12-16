import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateObservationDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'O campo tipo é obrigatório',
  })
  @IsString({
    message: 'O campo tipo precisa ser do tipo texto',
  })
  readonly type: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'O campo conteúdo é obrigatório',
  })
  @IsString({
    message: 'O campo conteúdo precisa ser do tipo texto',
  })
  readonly content: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'O ID do procedimento médico é obrigatório',
  })
  @IsInt({
    message: 'O ID do procedimento médico precisa ser um número inteiro',
  })
  readonly hospitalProcedureId: number;
}
