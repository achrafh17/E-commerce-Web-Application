import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
  @Get('getProducts')
  getAll() {
    return this.productService.getProducts();
  }
}
