import { IsNumber } from 'class-validator';

export class createCartItemDto {
  @IsNumber()
  productId: number;
  cartId: number;
}
