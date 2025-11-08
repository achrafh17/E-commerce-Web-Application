import { IsNumber, IsString } from 'class-validator';

export class createCouponDto {
  @IsNumber()
  discountValue: number;
  maxUses: number;
  @IsString()
  code: string;
}
