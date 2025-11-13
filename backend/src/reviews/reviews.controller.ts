import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { createReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async Create(@Body() data: createReviewDto, @Req() req) {
    const review = await this.reviewService.create(data, req.user.id);
    return review;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async Delete(@Param('id') id: string) {
    const review = await this.Delete(id);
    return review;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Body() data, @Param('id') id: string) {
    const review = await this.reviewService.update(data, id);
    return review;
  }
}
