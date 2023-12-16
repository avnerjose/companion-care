import { IsEmail } from 'class-validator';

export class MagicLinkLoginDto {
  @IsEmail()
  readonly email: string;
}
