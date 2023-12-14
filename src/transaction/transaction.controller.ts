import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}
  //getAllTransac
  @Get()
  async getAllTransaction() {
    return this.transactionService.getAllTransaction();
  }

  @Get('user/:id')
  async getUserTransaction(@Param('id', ParseIntPipe) userId: number) {
    return this.transactionService.getUserTransaction(userId);
  }
  @Get('vendor/:id')
  async getProductsWithVendorId(@Param('/:id', ParseIntPipe) id: number) {
    return this.transactionService.getProductsWithVendorId(id);
  }
}
