import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { prodcuctCategory } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}
  async createProduct(data: CreateProductDto, ownerId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: ownerId } });
    if (!user) throw new NotFoundException('user not found');
    const ownerName = user.username;
    const product = await this.prisma.product.create({
      data: { ...data, ownerId, ownerName },
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
    const products = await this.prisma.product.findMany({
      include: {
        favoritedBy: {},
      },
    });
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

  async update(data: any, id: string) {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID format not found');
    const productCheck = await this.prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!productCheck) throw new NotFoundException('product not found');
    const product = await this.prisma.product.update({
      where: { id: parseInt(id) },
      data: data,
    });
    return product;
  }
  async getReviews(id: string) {
    if (isNaN(parseInt(id)))
      throw new BadRequestException('ID format not found');
    const product = await this.prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) throw new NotFoundException('product not found');
    const reviews = await this.prisma.review.findMany({
      where: { productId: parseInt(id) },
    });
    return reviews;
  }
  async getProductByCategory(category: prodcuctCategory) {
    try {
      const products = await this.prisma.product.findMany({
        where: { category: category },
      });

      return products;
    } catch (error) {
      const message = error instanceof Error ? error : 'Unknow problem ';
      throw new NotFoundException(message);
    }
  }

  async addFavoritedProduct(productId: string, userId: string) {
    try {
      if (isNaN(parseInt(userId)))
        throw new BadRequestException('ID format not found');
      const user = await this.prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
      if (!user) throw new NotFoundException('user not found');
      if (isNaN(parseInt(productId)))
        throw new BadRequestException('ID format not found');
      const product = await this.prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });
      if (!product) throw new NotFoundException('product not found');
      await this.prisma.favorite.create({
        data: { userId: parseInt(userId), productId: parseInt(productId) },
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknnown error';
      throw new InternalServerErrorException(message);
    }
  }
  async removeFavoritedProduct(productId: string, userId: string) {
    try {
      if (isNaN(parseInt(userId)))
        throw new BadRequestException('ID format not found');
      const user = await this.prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
      if (!user) throw new NotFoundException('user not found');
      if (isNaN(parseInt(productId)))
        throw new BadRequestException('ID format not found');
      const product = await this.prisma.product.findUnique({
        where: { id: parseInt(productId) },
      });
      if (!product) throw new NotFoundException('product not found');
      const favorite = await this.prisma.favorite.findFirst({
        where: { userId: parseInt(userId), productId: parseInt(productId) },
      });
      if (!favorite) throw new NotFoundException('favorite item not found');
      await this.prisma.favorite.delete({
        where: {
          userId_productId: {
            userId: parseInt(userId),
            productId: parseInt(productId),
          },
        },
      });
      return favorite;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'unknnown error';
      throw new InternalServerErrorException(message);
    }
  }
  async getFavoritedProduct(userId: string) {
    const product = await this.prisma.favorite.findMany({
      where: { userId: parseInt(userId) },
    });
    return product;
  }
}
