import { IsNumber, IsString } from 'class-validator';

export class createReviewDto {
  @IsString()
  comment: string;
  @IsNumber()
  rating: number;
  productId: number;
}
