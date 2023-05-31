/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Transaction } from 'src/models/transaction.model';
import { Balance } from 'src/models/balance.model';
import { Sequelize } from 'sequelize';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction)
    private readonly transactionModel: typeof Transaction,
    @InjectModel(Balance)
    private readonly balanceModel: typeof Balance,
  ) {}
  async findAll(): Promise<Balance[]> {
    const data = await this.balanceModel.findAll({
      attributes: ['balance'],
      include: {
        model: this.transactionModel,
        attributes: [
          'trans_type',
          [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount'],
        ],
      },
      group: ['trans_type'],
    });
    return data;
  }
  async allTransaction(): Promise<Transaction[]> {
    const data = await this.transactionModel.findAll({
      attributes: ['id', 'name', 'trans_type', 'amount'],
    });
    return data;
  }
  async newTransaction(transactionData: any): Promise<Transaction> {
    if (transactionData.trans_type === 'income') {
      const prevBalance = await this.balanceModel.findOne({ where: { id: 1 } });
      await this.balanceModel.update(
        { balance: prevBalance.balance + transactionData.amount },
        { where: { id: 1 } },
      );
    }
    if (transactionData.trans_type === 'expense') {
      const prevBalance = await this.balanceModel.findOne({ where: { id: 1 } });
      await this.balanceModel.update(
        { balance: prevBalance.balance - transactionData.amount },
        { where: { id: 1 } },
      );
    }
    const newTransaction = this.transactionModel.create(transactionData);
    return newTransaction;
  }
  async editTransaction(transactionData: any): Promise<string> {
    const prevBalance = await this.balanceModel.findOne({ where: { id: 1 } });
    const prevTransaction = await this.transactionModel.findOne({
      where: { id: transactionData.id },
    });
    await this.balanceModel.update(
      { balance: prevBalance.balance + prevTransaction.amount },
      { where: { id: 1 } },
    );

    if (transactionData.trans_type === 'income') {
      const prevBalance = await this.balanceModel.findOne({ where: { id: 1 } });
      await this.balanceModel.update(
        { balance: prevBalance.balance + transactionData.amount },
        { where: { id: 1 } },
      );
    }
    if (transactionData.trans_type === 'expense') {
      const prevBalance = await this.balanceModel.findOne({ where: { id: 1 } });
      await this.balanceModel.update(
        { balance: prevBalance.balance - transactionData.amount },
        { where: { id: 1 } },
      );
    }
    await this.transactionModel.update(transactionData, {
      where: { id: transactionData.id },
    });
    return 'Transaction edited';
  }
  async deleteTransaction(id: any): Promise<string> {
    const prevBalance = await this.balanceModel.findOne({ where: { id: 1 } });
    const prevTransaction = await this.transactionModel.findOne({
      where: { id },
    });
    await this.balanceModel.update(
      { balance: prevBalance.balance + prevTransaction.amount },
      { where: { id: 1 } },
    );
    await this.transactionModel.destroy({ where: { id } });
    return 'Transaction deleted';
  }
}
