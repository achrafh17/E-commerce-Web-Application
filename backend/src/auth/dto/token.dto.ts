import { IsString } from 'class-validator';

export class tokenDto {
  @IsString()
  token: string;
}
