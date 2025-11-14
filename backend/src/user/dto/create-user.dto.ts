import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export enum Role {
  user = 'user',
  admin = 'admin',
  guest = 'guest',
  seller = 'seller',
}

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsEmail()
  email: string;
}
