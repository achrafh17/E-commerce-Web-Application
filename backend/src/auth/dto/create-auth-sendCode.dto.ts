import { IsEmail } from 'class-validator';

export class sendCodeDto {
  @IsEmail()
  email: string;
}
