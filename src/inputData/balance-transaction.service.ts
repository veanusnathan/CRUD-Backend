/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Balance } from 'src/models/balance.model';
import { Transaction } from 'src/models/transaction.model';

@Injectable()
export class BalanceTransactionService {
  constructor(
    @InjectModel(Balance)
    private readonly balanceModel: typeof Balance,
    @InjectModel(Transaction)
    private readonly transactionModel: typeof Transaction,
  ) {}

  async createBalanceWithTransactions(): Promise<Balance> {
    const balanceData = { balance: 10000000 };

    const createdBalance = await this.balanceModel.create(balanceData);

    const transactionsData = [
      {
        name: 'Salary',
        trans_type: 'income',
        amount: 10000000,
        balance_id: 1,
      },
      {
        name: 'Eating out',
        trans_type: 'expense',
        amount: 300000,
        balance_id: 1,
      },
      {
        name: 'Rent',
        trans_type: 'expense',
        amount: 2000000,
        balance_id: 1,
      },
    ];

    const createdTransactions = await this.transactionModel.bulkCreate(
      transactionsData,
    );

    createdBalance.transactions = createdTransactions;

    return createdBalance;
  }
}
