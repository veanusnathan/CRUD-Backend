/* eslint-disable prettier/prettier */
import {
  Column,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Balance } from './balance.model';
@Table({ tableName: 'transaction' })
export class Transaction extends Model<Transaction> {
  @Column
  name: string;

  @Column
  trans_type: string;

  @Column
  amount: number;

  @ForeignKey(() => Balance)
  @Column
  balance_id: number;

  @BelongsTo(() => Balance)
  balance: Balance[];
}
