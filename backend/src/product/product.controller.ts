import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('createProduct')
  createProduct(@Body() dto: createProductDto) {
    return this.productService.createProduct(dto);
  }
  @Get('getProduct/:id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }
  @Delete('delete/:id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
  @Get('getProducts')
  getProducts() {
    return this.productService.getProducts();
  }
}
