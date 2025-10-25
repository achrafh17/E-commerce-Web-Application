import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async createProduct(data: CreateProductDto) {
    const product = await this.prisma.product.create({ data });
    return product;
  }
  async getProduct(id: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    return product;
  }
  async deleteProduct(id: string) {
    const product = await this.prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    return product;
  }

  async getProducts() {
    const products = await this.prisma.product.findMany();
    return products;
  }
}
