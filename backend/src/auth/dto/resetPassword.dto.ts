import { IsString } from 'class-validator';

export class resetPasswordDto{
  @IsString()
  newPassword: string;
  code: string;
}
