import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  email: string;
  password: string;
}
