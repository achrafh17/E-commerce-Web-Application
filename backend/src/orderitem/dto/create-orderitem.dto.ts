import { IsNumber } from 'class-validator';

export class createOrderItemDto {
  @IsNumber()
  orderId: number;
  productId: number;
  quantity: number;
}
