/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Balance } from '../models/balance.model';
import { Transaction } from '../models/transaction.model';
import { BalanceTransactionService } from './balance-transaction.service';
import { BalanceTransactionController } from './balance-transaction.controller';

@Module({
  imports: [SequelizeModule.forFeature([Balance, Transaction])],
  controllers: [BalanceTransactionController],
  providers: [BalanceTransactionService],
})
export class BalanceTransactionModule {}
