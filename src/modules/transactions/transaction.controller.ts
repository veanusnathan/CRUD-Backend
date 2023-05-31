/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Transaction } from 'src/models/transaction.model';
import { Balance } from 'src/models/balance.model';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async findAll(): Promise<Balance[]> {
    return this.transactionService.findAll();
  }
  @Get('all')
  async allTransaction(): Promise<Transaction[]> {
    return this.transactionService.allTransaction();
  }
  @Post('new-transaction')
  async newTransaction(@Body() transactionData: any): Promise<string> {
    await this.transactionService.newTransaction(transactionData);
    return 'Transaction added';
  }
  @Patch('edit-transaction')
  async editTransaction(@Body() transactionData: any): Promise<string> {
    await this.transactionService.newTransaction(transactionData);
    return 'Transaction edited';
  }
  @Delete('delete-transaction:id')
  async deleteTransaction(@Param() id: any): Promise<string> {
    await this.transactionService.deleteTransaction(id);
    return 'Transaction Deleted';
  }
}
