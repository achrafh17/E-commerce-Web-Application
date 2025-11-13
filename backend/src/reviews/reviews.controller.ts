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
import { LogsService } from 'src/logs/logs.service';

@Controller('reviews')
export class ReviewsController {
  constructor(
    private readonly reviewService: ReviewsService,
    private readonly logsService: LogsService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async Create(@Body() data: createReviewDto, @Req() req) {
    const review = await this.reviewService.create(data, req.user.id);
    await this.logsService.createLog({
      userId: req.user.id,
      action: `create review`,
      description: `User ${req.user.id} post a review ${review.id} on product ${review.productId}`,
      ipAddress: 'this is an ip address',
    });
    return review;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async Delete(@Param('id') id: string, @Req() req) {
    const review = await this.reviewService.delete(id);
    await this.logsService.createLog({
      userId: req.user.id,
      action: `delete review`,
      description: `User ${req.user.id} delete review ${id} for product ${review.id}`,
      ipAddress: 'this is an ip address',
    });
    return review;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Body() data, @Param('id') id: string, @Req() req) {
    const review = await this.reviewService.update(data, id);
    await this.logsService.createLog({
      userId: req.user.id,
      action: `update review`,
      description: `User ${req.user.id} update review ${id} for product ${review.id}`,
      ipAddress: 'this is an ip address',
    });
    return review;
  }
}
