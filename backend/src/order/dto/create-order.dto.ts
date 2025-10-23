import { IsNumber } from 'class-validator';

export class createOrderDto {
  @IsNumber()
  userId: number;
  total: number;
}
