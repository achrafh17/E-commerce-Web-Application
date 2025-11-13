import { IsEnum, IsNumber, IsOptional } from 'class-validator';
export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}
export class CreateOrderDto {
  @IsNumber()
  total: number;
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;
}
