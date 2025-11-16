import { IsEmail } from 'class-validator';

export class recoverPasswordDto {
  @IsEmail()
  email: string;
}
