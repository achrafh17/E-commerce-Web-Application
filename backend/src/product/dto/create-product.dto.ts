import {  IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  title: string;
  description: string;
  imageUrl: string;
  @IsNumber()
  price: number;
  ownerId: number;
 
}
