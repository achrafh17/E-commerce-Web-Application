import { IsNumber, IsOptional } from 'class-validator';

export class createCartItemDto {
  @IsNumber()
  quantity: number;
  @IsOptional()
  @IsNumber()
  productId: number;
  cartId: number;
}
