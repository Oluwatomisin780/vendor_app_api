import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}
  //getAllTransac
  @Get()
  async getAllTransaction() {
    return this.transactionService.getAllTransaction();
  }

  @Get('user/:id')
  async getUserTransaction(@Param('id', ParseIntPipe) userId: string) {
    return this.transactionService.getUserTransaction(userId);
  }
  @Get('vendor/:id')
  async getProductsWithVendorId(@Param('/:id', ParseIntPipe) id: string) {
    return this.transactionService.getProductsWithVendorId(id);
  }
}
