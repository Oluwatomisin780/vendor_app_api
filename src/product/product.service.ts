import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/createProduct.dto';
import { checkoutDto } from './dto/checkOut.dto';
@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  //findallProduct
  async findAllProducts() {
    return await this.prismaService.product.findMany();
  }
  //create product
  async creataProduct({
    price,
    name,
    description,
    quantity,
  }: CreateProductDto) {
    const product = await this.prismaService.product.create({
      data: {
        quantity,
        description,
        price,
        name,
        vendor_id: 1,
      },
    });
    return product;
  }
  //getsingleproduct
  async getSingleProduct(id: number) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
    return product;
  }
  //update a PRODUCT
  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
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
  async checkout(checkoutDto: checkoutDto) {
    checkoutDto.totalAmount = checkoutDto.unitprice * checkoutDto.quantity;

    let transaction = await this.prismaService.transaction.create({
      data: {
        unitprice: checkoutDto.unitprice,
        totalAmount: checkoutDto.totalAmount,
        quantity: checkoutDto.quantity,
        vendor_id: 1,
        buyer_id: 1,
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
