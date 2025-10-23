import { IsDate, IsEmail, IsNumber, IsString } from 'class-validator';
export class createUserDto {
  @IsString()
  username: string;
  password: string;

  @IsEmail()
  email: string;
 

}
