import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private prismaService: PrismaService) {}
  //getAllTransaction
  async getAllTransaction() {
    return this.prismaService.transaction.findMany();
  }
  //getAuserTrancsaction

  async getUserTransaction(userId: string) {
    return this.prismaService.transaction.findMany({
      where: {
        buyer_id: userId,
      },
    });
  }
  //getAllProductWithVendorId
  async getProductsWithVendorId(vendorId: string) {
    const transaction = await this.prismaService.transaction.findMany({
      where: {
        product: {
          some: {
            vendor_id: vendorId,
          },
        },
      },
    });
    return transaction;
  }
}
