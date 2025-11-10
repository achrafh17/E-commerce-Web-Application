import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async createProduct(data: CreateProductDto, ownerId: number) {
    const product = await this.prisma.product.create({
      data: { ...data, ownerId },
    });
    return product;
  }
  async getProduct(id: string) {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID format not found');
    const product = await this.prisma.product.findFirst({
      where: {
        id: parseInt(id),
      },
    });
    if (!product) throw new NotFoundException('product not found');
    return product;
  }
  async deleteProduct(id: string) {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID format not found');
    const productCheck = await this.prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!productCheck) throw new NotFoundException('Product not found');
    const product = await this.prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });

    return product;
  }

  async getProducts() {
    const products = await this.prisma.product.findMany();
    if (products.length === 0)
      throw new NotFoundException('No products available');
    return products;
  }
  async getUserProducts(id: string) {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID format not found');
    const user = await this.prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!user) throw new NotFoundException('user not found');
    const products = await this.prisma.product.findMany({
      where: {
        ownerId: parseInt(id),
      },
    });
    return products;
  }
  async changeStatus(id: string, data: any) {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID format not found');
    const productCheck = await this.prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    const product = await this.prisma.product.update({
      where: { id: parseInt(id) },
      data,
    });
    return product;
  }
}
