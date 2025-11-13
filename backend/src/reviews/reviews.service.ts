import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async update(data: any, id: string) {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID forn=mat not found');
    const reviewCheck = await this.prisma.review.findUnique({
      where: { id: parseInt(id) },
    });
    if (!reviewCheck) throw new NotFoundException('review not found');
    const review = await this.prisma.review.update({
      where: { id: parseInt(id) },
      data: data,
    });
    return review;
  }
  async delete(id: string) {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID forn=mat not found');
    const review = await this.prisma.review.findUnique({
      where: { id: parseInt(id) },
    });
    if (!review) throw new NotFoundException('review not found');
    await this.prisma.review.delete({ where: { id: parseInt(id) } });
  }
}
