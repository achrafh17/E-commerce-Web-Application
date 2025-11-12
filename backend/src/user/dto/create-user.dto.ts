import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}
export class CreateUserDto {
  @IsString()
  username: string;
  password: string;
  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsEmail()
  email: string;
}
