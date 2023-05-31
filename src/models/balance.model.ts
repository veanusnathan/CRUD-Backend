/* eslint-disable prettier/prettier */
import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Transaction } from './transaction.model';
@Table({ tableName: 'balance' })
export class Balance extends Model<Balance> {
  @Column
  balance: number;

  @HasMany(() => Transaction)
  transactions: Transaction[];
}
