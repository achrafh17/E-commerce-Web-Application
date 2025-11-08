import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: createReviewDto, userId: number) {
    const review = await this.prisma.review.create({
      data: { ...data, userId },
    });
    return review;
  }
}
