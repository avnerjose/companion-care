import { IsNotEmpty, IsString } from 'class-validator';

export class SendPushNotificationDTO {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
