/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { BalanceTransactionService } from './balance-transaction.service';

@Controller('balance-transaction')
export class BalanceTransactionController {
  constructor(
    private readonly balanceTransactionService: BalanceTransactionService,
  ) {}
  @Get('insert-data')
  async insertData(): Promise<string> {
    await this.balanceTransactionService.createBalanceWithTransactions();
    return 'Data inserted';
  }
}
