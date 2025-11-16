import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Delete,
  UseGuards,
  Req,
  Patch,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { LogsService } from 'src/logs/logs.service';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly LogsService: LogsService,
  ) {}
  @Roles('seller')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async create(@Body() data: CreateProductDto, @Req() req) {
    const product = await this.productService.createProduct(data, req.user.id);
    await this.LogsService.createLog({
      userId: req.user.id,
      action: 'Create Product',
      description: `User ${req.user.id} created Product N- ${product.id}`,
      ipAddress: 'this is an ip address',
    });
    return product;
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }
  @Roles('seller')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async delete(@Param('id') ids: string, @Req() req) {
    await this.LogsService.createLog({
      userId: req.user.id,
      action: 'Delete Order',
      description: `User ${req.user.id} delete Order N- ${ids}`,
      ipAddress: 'this is an ip address',
    });
    return this.productService.deleteProduct(ids);
  }

  @Get()
  getAll() {
    return this.productService.getProducts();
  }

  @Get('/user/:id')
  products(@Param('id') id: string) {
    return this.productService.getUserProducts(id);
  }

  @Roles('seller')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id/status/:status')
  async disactivateProduct(
    @Param('id') id: string,
    @Param('status') status: string,
    @Req() req,
  ) {
    const product = await this.productService.changeStatus(id, {
      status: status,
    });
    await this.LogsService.createLog({
      userId: req.user.id,
      action: `${status} Product`,
      description: `User ${req.user.id} ${status} product N- ${id}`,
      ipAddress: 'this is an ip address',
    });
    return product;
  }
  @Roles('seller')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  async update(@Body() data: any, @Param('id') id: string, @Req() req) {
    const product = await this.productService.update(data, id);
    await this.LogsService.createLog({
      userId: req.user.id,
      action: `update Product`,
      description: `User ${req.user.id} update product N- ${id}`,
      ipAddress: 'this is an ip address',
    });
    return product;
  }
  @Get(':id/reviews')
  async getReviews(@Param('id') id: string) {
    const reviews = await this.productService.getReviews(id);
    return reviews;
  }
}
