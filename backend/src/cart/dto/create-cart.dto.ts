import { IsDate } from 'class-validator';

export class createCartDto {
  @IsDate()
  createdAt: Date;
}
