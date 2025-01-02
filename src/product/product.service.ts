import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/createProduct.dto';
import { checkoutDto } from './dto/checkOut.dto';
import { user } from '../types/user.type';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  //findallProduct
  async findAllProducts() {
    return await this.prismaService.product.findMany();
  }
  //create product
  async creataProduct(
    { price, name, description, quantity }: CreateProductDto,
    userId: string,
  ) {
    const product = await this.prismaService.product.create({
      data: {
        quantity,
        description,
        price,
        name,
        vendor_id: userId,
      },
    });
    return product;
  }
  //getsingleproduct
  async getSingleProduct(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
    return product;
  }
  //update a PRODUCT
  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        ...updateProductDto,
      },
    });
  }
  //DELETE Product

  //checkout product
  async checkout(checkoutDto: checkoutDto, userId: string) {
    checkoutDto.totalAmount = checkoutDto.unitprice * checkoutDto.quantity;

    let transaction = await this.prismaService.transaction.create({
      data: {
        unitprice: checkoutDto.unitprice,
        totalAmount: checkoutDto.totalAmount,
        quantity: checkoutDto.quantity,
        buyer_id: userId,
        product: {
          create: checkoutDto.product,
        },
      },
    });
    const products = await this.prismaService.transaction
      .findUnique({
        where: { id: transaction.id },
      })
      .product();
    for (const product of products) {
      await this.prismaService.product.update({
        where: { id: product.id },
        data: {
          quantity: {
            increment: -checkoutDto.quantity,
          },
        },
      });
    }
    return transaction;
  }
}
