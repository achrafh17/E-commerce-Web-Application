import {  IsNumber, IsString } from 'class-validator';

export class createProductDto {
  @IsString()
  title: string;
  description: string;
  imageUrl: string;
  @IsNumber()
  price: number;
  ownerId: number;
 
}
