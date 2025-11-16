import {  IsString } from 'class-validator';

export class verifyEmailDto {
  @IsString()
  code: string;
}
